#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load_json(path: str):
    with (ROOT / path).open("r", encoding="utf-8") as fh:
        return json.load(fh)


def require(condition: bool, message: str):
    if not condition:
        raise SystemExit(f"FAIL: {message}")


def main():
    contract = load_json(".amo")
    project = load_json("amo.project.json")
    readme = (ROOT / "README.md").read_text(encoding="utf-8")

    require(contract.get("schema") == "desarrollamo.amo.v1", "invalid .amo schema")
    require(contract.get("id") == "cobramo", "unexpected .amo id")
    require(contract.get("policy", {}).get("self_declared_pass_allowed") is False,
            "CobrAMO must not self-declare PASS")

    checks = contract.get("health", {}).get("checks", [])
    require(len(checks) == 1, "expected exactly one canonical health check")
    require(checks[0].get("command") == "python3 scripts/autocheck.py",
            "health command does not point to canonical AutoCheck")

    require(project.get("repository") == "amoedo7/CobrAMO", "project repository mismatch")
    require(project.get("name") == "CobrAMO", "project name mismatch")
    require(project.get("lifecycle") == "placeholder", "lifecycle must remain placeholder until source reconciliation")
    require(project.get("source_of_truth") is False, "placeholder must not claim source-of-truth status")
    require(project.get("production_url") == "https://cobramo.netlify.app/", "unexpected production reference")

    platform = project.get("production_platform", {})
    require(platform.get("provider") == "netlify", "production provider must remain Netlify")
    require(platform.get("project_name") == "cobramo", "unexpected Netlify project name")
    require(platform.get("site_id") == "5eb79ee0-1f9b-4f7c-8ffb-a25d457c55e1",
            "unexpected Netlify site identity")
    require(platform.get("source_status") == "unreconciled",
            "source status must remain unreconciled until repository/workspace provenance is recovered")

    evidence = project.get("production_evidence", {})
    require(evidence.get("observed_at") == "2026-08-30", "missing production evidence observation date")
    require(evidence.get("deploy_id") == "6a7d6bc1d75069b3afa2f40e", "unexpected evidence deploy id")
    require(evidence.get("deploy_state") == "ready", "observed production deploy was not ready")
    require(evidence.get("deploy_source") == "cli", "observed deploy source must remain recorded as CLI")
    require(evidence.get("build_id") is None, "observed deploy unexpectedly claims a build id")
    require(evidence.get("commit_ref") is None, "observed deploy unexpectedly claims a commit ref")
    require(evidence.get("public_repo") is None, "observed deploy unexpectedly claims a public repository")

    require("Placeholder histórico" in readme, "README must state placeholder status")
    require("no es fuente de verdad" in readme, "README must state non-authoritative status")
    require("https://cobramo.netlify.app/" in readme, "README must retain production reference")
    require("5eb79ee0-1f9b-4f7c-8ffb-a25d457c55e1" in readme,
            "README must retain stable Netlify site identity")
    require("deploy_source=cli" in readme, "README must retain observed deploy provenance limitation")
    require("no inventar estados `PAYMENT_VERIFIED`" in readme,
            "README must preserve payment-verification boundary")

    print("PASS: CobrAMO contract, Netlify identity and unreconciled-source boundary are consistent")


if __name__ == "__main__":
    main()

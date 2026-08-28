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

    require("Placeholder histórico" in readme, "README must state placeholder status")
    require("no es fuente de verdad" in readme, "README must state non-authoritative status")
    require("https://cobramo.netlify.app/" in readme, "README must retain production reference")
    require("no inventar estados `PAYMENT_VERIFIED`" in readme,
            "README must preserve payment-verification boundary")

    print("PASS: CobrAMO canonical contract and placeholder boundaries are consistent")


if __name__ == "__main__":
    main()

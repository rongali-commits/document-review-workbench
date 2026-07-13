import test from "node:test";
import assert from "node:assert/strict";
import { analyzeDocument, parseCriteria } from "../site/analyzer.js";

test("criteria are normalized and deduplicated",()=>{assert.deepEqual(parseCriteria("Python, api, python,  "),["python","api"])});
test("analysis reports matches, missing terms, and evidence",()=>{const result=analyzeDocument("Python automation with client reporting.","python, api, reporting");assert.equal(result.score,67);assert.deepEqual(result.matches,["python","reporting"]);assert.deepEqual(result.missing,["api"]);assert.equal(result.evidence.length,2)});
test("empty criteria produce a safe zero score",()=>{assert.equal(analyzeDocument("Some text","").score,0)});


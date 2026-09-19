# SkillDrills Localization & Content Depth Workflow

## 1. End-to-End One Drill Resolution Pipeline

```mermaid
flowchart TD
    Start(["Start / Next Queue Item"]) --> SelectDrill["Select Next Drill Route<br/>(Strictly One Drill at a Time)"]
    
    subgraph ResearchPhase["Phase 1: Deep Audit & Root Cause Analysis"]
        SelectDrill --> ASTCheck["AST Depth Auditor<br/>(comprehensive_audit.js)"]
        SelectDrill --> PropCheck["Runtime Prop Scanner<br/>(check_all_drillguide_props.js)"]
        ASTCheck & PropCheck --> DiffCompare["Compare Locale Files vs English Canonical<br/>(Intros, Benchmarks, Techniques, Sources, FAQs)"]
    end

    subgraph PlanningPhase["Phase 2: Planning & Alignment"]
        DiffCompare --> DraftPlan["Create / Update implementation_plan.md"]
        DraftPlan --> UserApproval{"User Review & Approval"}
    end

    subgraph ExecutionPhase["Phase 3: Execution & Authentic Transcreation"]
        UserApproval -->|"Approved"| CodeFix["Fix Runtime Props / Spread Syntax"]
        CodeFix --> NativeTranscreation["Native Transcreation & Content Expansion<br/>(Scientific literature, 10 FAQs, benchmarks)"]
        NativeTranscreation --> GuardrailCheck{"Guardrail Check:<br/>ENABLE_INDEXNOW=false?<br/>No translation word-for-word?"}
    end

    subgraph VerificationPhase["Phase 4: Automated Verification"]
        GuardrailCheck -->|"Pass"| SyntaxCheck["Syntax Validation<br/>(node -c file.js)"]
        SyntaxCheck --> VerifyProps["Re-run Prop Scanner<br/>(check_all_drillguide_props.js)"]
        VerifyProps --> VerifyAST["Re-run AST Auditor<br/>(comprehensive_audit.js)"]
        VerifyAST --> ValidateZero["Confirm 0 Remaining Defects for Route"]
    end

    subgraph CompletionPhase["Phase 5: Documentation & Progression"]
        ValidateZero --> UpdateWalkthrough["Document in walkthrough.md & Master Tracker"]
        UpdateWalkthrough --> CheckRemaining{"Any Remaining<br/>Defects in Repo?"}
        CheckRemaining -->|"Yes"| AdvanceNext["Queue Next Highest-Impact Drill Route"]
        AdvanceNext --> SelectDrill
        CheckRemaining -->|"No (100% Parity)"| ReadyRelease(["Repository Complete & Ready for Deployment"])
    end
```

---

## 2. Priority Queue & Current Progress Status

```mermaid
flowchart LR
    subgraph Done["COMPLETED"]
        D1["memory/working-memory/n-back<br/>(18 defects resolved across 6 locales)"]
    end

    subgraph Active["CURRENT TARGET"]
        D2["reaction-speed/fps-tracking-trainer<br/>(Fix scientificIntro prop & 4th protocol)"]
    end

    subgraph Queue1["NEXT IN LINE"]
        D3["Broken pickSources Keys<br/>(5 routes / 7 files)"]
    end

    subgraph Queue2["QUEUED"]
        D4["French Missing Techniques<br/>(4 spatial & focus routes)"]
        D5["Remaining Trimmed Intros & Depth<br/>(Iterative single-drill resolution)"]
    end

    subgraph Final["FINAL GATE"]
        D6["Full Repo Validation<br/>(0 defects across all 545 pages)"]
    end

    Done --> Active --> Queue1 --> Queue2 --> Final

    classDef doneStyle fill:#0d532b,stroke:#27ae60,stroke-width:2px,color:#fff;
    classDef activeStyle fill:#7a4b04,stroke:#f39c12,stroke-width:2px,color:#fff;
    classDef queueStyle fill:#1a252f,stroke:#34495e,stroke-width:1px,color:#ddd;
    classDef finalStyle fill:#162447,stroke:#1f4068,stroke-width:2px,color:#fff;

    class D1 doneStyle;
    class D2 activeStyle;
    class D3,D4,D5 queueStyle;
    class D6 finalStyle;
```

---

## 3. Core Quality Gates Per Drill

| Gate | Criterion | Tool / Verification | Status Rule |
| :--- | :--- | :--- | :--- |
| **G1: Runtime Props** | Zero silently dropped props (`lead`, `scientificIntro`) | `check_all_drillguide_props.js` | Must be 0 |
| **G2: Content Depth** | 5 intro paragraphs, 5 benchmark rows, 4+ protocols, 10 FAQs | `comprehensive_audit.js` | 100% match with English |
| **G3: Citations** | Valid keys in `pickSources(...)` | Runtime test against `lib/drillSources.js` | Non-empty array returned |
| **G4: Syntax** | Valid JS / JSX syntax | `node -c <file.js>` | Exit code 0 |
| **G5: Guardrail** | Zero IndexNow / Bing API pings | Environment check | `ENABLE_INDEXNOW=true` strictly forbidden |

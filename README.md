# COMP4551 — Large-Scale ML Systems for Foundation Models · Study Site

An interactive, self-paced revision site for HKUST COMP4551 (Spring 2026 final exam).
Built as a beginner-friendly tutoring system: each topic has a structured lesson with
objectives, Socratic checks, fill-in exercises with instant grading, and a final
integrative challenge that combines every lecture into one end-to-end scenario.

🔗 **Live site:** https://SimonSinon.github.io/comp4551-study/

## Layout

```
/
├── index.html              # Main revision plan (topic table + 1-week schedule)
└── lessons/
    ├── _shared.css         # Shared styling
    ├── _shared.js          # Exercise grader (fuzzy text + numeric tolerance)
    ├── 01-ml-prelim.html       · Lesson 1  — ML preliminaries
    ├── 02-sgd-autodiff.html    · Lesson 2  — SGD & autodiff
    ├── 03-transformer-pretrain.html
    ├── 04-gpu-nccl.html
    ├── 05-parallelism.html
    ├── 06-moe-sequence.html
    ├── 07-inference-basics.html
    ├── 08-inference-opts.html
    ├── 09-prompt-engineering.html
    ├── 10-scaling-rag.html
    ├── 11-agents-peft.html
    ├── 12-rlhf-eval.html
    └── final-challenge.html    · Integrative end-to-end scenario
```

## How to use

1. Open `index.html` in any browser.
2. Click a topic in the table — that opens its lesson.
3. Read the lesson, try the Socratic questions, fill in the exercises.
4. Use **Check** to grade your answer, **Hint** if stuck, **Show solution** as a last resort.
5. Finish the week with `lessons/final-challenge.html`.

## Local preview

No build step. Just open `index.html`, or serve with:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## License

Site content: MIT (see [LICENSE](LICENSE)). Lecture PDFs are **not** included in this
repo and remain the copyright of their original authors.

# Research Background

VANTAGE is born out of the need for more rigorous evaluation of LLM agents in real-world, high-stakes domains.

## The Benchmarking Gap
Traditional LLM benchmarks (MMLU, HumanEval) primarily test static knowledge or code generation. They fail to capture the **investigative competence** required for geopolitical analysis. VANTAGE fills this gap by providing:
- **Dynamic Context**: The state of the world changes; the agent must research.
- **Multi-Hop Reasoning**: No single "fact" provides the answer; agents must synthesize trends.

## Data Methodology
We leverage GDELT (Global Database of Events, Language, and Tone)—the largest open-source global event index.
- **Events**: 400+ categories of human interaction.
- **Relational Mapping**: Connecting actors through event weightings and temporal proximity.

## Evaluation Metrics
We measure agent performance through three lenses:
1. **Fidelity**: How accurately does the agent query and interpret the Global Graph?
2. **Coherence**: Do the reasoning steps logically lead to the forecast?
3. **Calibration**: Does the agent's confidence score correlate with the historical outcome (in backtesting)?

## Reference Implementation
Our baseline agents use the `ReAct` pattern, implemented in Python and managed via the VANTAGE Backend. Researchers can find sample execution logs in the `examples/` directory.

# AI & Agent Pipeline

VANTAGE moves beyond one-shot prompting by implementing a robust agentic loop focused on investigation and evidence-based forecasting.

## The Intelligence Pipeline

1. **Extraction**: Harvesting raw events from GDELT.
2. **Standardization**: Mapping disparate signals into the Global Graph.
3. **Contextualization**: Enhancing relational nodes with textual news analysis.
4. **Reasoning**: LLM agents navigating the graph to find hidden dependencies.

## Agent Architecture: ReAct+
We utilize an enhanced "Reasoning + Acting" pattern:
- **Think**: Analyze the geopolitical query and identify required evidence.
- **Act**: Query the Global Graph for historical interactions between actors.
- **Observe**: Synthesize the returned event clusters.
- **Forecast**: Generate a high-confidence prediction based on temporal trends.

## Data Modality
- **Structured**: TAB-separated event logs (GDELT).
- **Unstructured**: News article summaries and sentiment analysis.
- **Relational**: Graph-based connections between geopolitical entities.

## Future Research
We are exploring "Multi-Agent Debates" where two agents take opposing geopolitical stances and must find consensus based on the shared Global Graph data.

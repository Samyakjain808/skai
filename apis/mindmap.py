# from flask import Blueprint, request, send_file, jsonify
# from graphviz import Digraph
# import spacy
# from collections import defaultdict

# mindmap_api = Blueprint("mindmap_api", __name__)

# nlp = spacy.load("en_core_web_sm")

# def auto_outline(text: str):
#     doc = nlp(text)
#     heading = next((ent.text.strip() for ent in doc.ents if ent.label_ in ["GPE", "ORG", "PERSON", "NORP"]), None)
#     if not heading:
#         heading = next((chunk.text.strip() for chunk in doc.noun_chunks), "Topic")

#     outline = defaultdict(list)
#     for sent in doc.sents:
#         topic = next((ent.label_ for ent in sent.ents), None)
#         if not topic and sent.noun_chunks:
#             topic = next(sent.noun_chunks).text.strip().split()[0]
#         if not topic:
#             topic = "General"
#         outline[topic].append(sent.text.strip())

#     result = [heading]
#     for topic, items in outline.items():
#         result.append(f"  {topic}")
#         for s in items:
#             result.append(f"    {s}")
#     return "\n".join(result)

# def text_to_mindmap(text, output_file="mindmap", format="svg"):
#     lines = [line.rstrip() for line in text.strip().split("\n") if line.strip()]
#     dot = Digraph(comment="Mind Map", format=format)
#     dot.attr(rankdir='LR', size='8,5')

#     stack = []
#     for i, line in enumerate(lines):
#         indent = len(line) - len(line.lstrip())
#         content = line.strip()
#         node_id = f"n{i}"
#         dot.node(node_id, content)

#         if indent > 0:
#             parent = next((n for n in reversed(stack) if n["indent"] < indent), None)
#             if parent:
#                 dot.edge(parent["id"], node_id)
#         stack.append({"id": node_id, "indent": indent})

#     output_path = output_file + "." + format
#     dot.render(filename=output_file, cleanup=True)
#     return output_path

# @mindmap_api.route("/generate_mindmap", methods=["POST"])
# def generate_mindmap():
#     data = request.get_json()
#     text = data.get("text")
#     fmt = request.args.get("format", "svg").lower()
#     auto = request.args.get("auto", "false").lower() == "true"

#     if not text:
#         return jsonify({"error": "Missing 'text' field"}), 400

#     try:
#         if auto:
#             text = auto_outline(text)
#         output_file = text_to_mindmap(text, output_file="mindmap", format=fmt)
#         mimetype = "image/svg+xml" if fmt == "svg" else "image/png"
#         return send_file(output_file, mimetype=mimetype)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500




# from flask import Blueprint, request, send_file, jsonify
# from graphviz import Digraph
# import spacy
# import requests
# from collections import defaultdict

# mindmap_api = Blueprint("mindmap_api", __name__)
# nlp = spacy.load("en_core_web_sm")

# # ✅ 1. Wikipedia fetch function
# def fetch_from_wikipedia(query):
#     url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query.replace(' ', '_')}"
#     try:
#         response = requests.get(url)
#         if response.status_code == 200:
#             data = response.json()
#             return data.get("extract", "")
#         else:
#             return ""
#     except Exception as e:
#         print(f"Error fetching from Wikipedia: {e}")
#         return ""

# # ✅ 2. Smart outline from raw text
# def auto_outline(text: str):
#     doc = nlp(text)
#     heading = next((ent.text.strip() for ent in doc.ents if ent.label_ in ["GPE", "ORG", "PERSON", "NORP"]), None)
#     if not heading:
#         heading = next((chunk.text.strip() for chunk in doc.noun_chunks), "Topic")

#     outline = defaultdict(list)
#     for sent in doc.sents:
#         topic = next((ent.label_ for ent in sent.ents), None)
#         if not topic and sent.noun_chunks:
#             topic = next(sent.noun_chunks).text.strip().split()[0]
#         if not topic:
#             topic = "General"
#         outline[topic].append(sent.text.strip())

#     result = [heading]
#     for topic, items in outline.items():
#         result.append(f"  {topic}")
#         for s in items:
#             result.append(f"    {s}")
#     return "\n".join(result)

# # ✅ 3. Convert outline to mind map SVG or PNG
# def text_to_mindmap(text, output_file="mindmap", format="svg"):
#     lines = [line.rstrip() for line in text.strip().split("\n") if line.strip()]
#     dot = Digraph(comment="Mind Map", format=format)
#     dot.attr(rankdir='LR', size='8,5')

#     stack = []
#     for i, line in enumerate(lines):
#         indent = len(line) - len(line.lstrip())
#         content = line.strip()
#         node_id = f"n{i}"
#         dot.node(node_id, content)

#         if indent > 0:
#             parent = next((n for n in reversed(stack) if n["indent"] < indent), None)
#             if parent:
#                 dot.edge(parent["id"], node_id)
#         stack.append({"id": node_id, "indent": indent})

#     output_path = output_file + "." + format
#     dot.render(filename=output_file, cleanup=True)
#     return output_path

# # ✅ 4. Flask route
# @mindmap_api.route("/generate_mindmap", methods=["POST"])
# def generate_mindmap():
#     data = request.get_json()
#     text = data.get("text")
#     fmt = request.args.get("format", "svg").lower()
#     auto = request.args.get("auto", "false").lower() == "true"

#     if not text:
#         return jsonify({"error": "Missing 'text' field"}), 400

#     try:
#         if auto:
#             # If user enters only a topic (short text), fetch from Wikipedia
#             if len(text.strip().split()) <= 6:
#                 wiki_text = fetch_from_wikipedia(text)
#                 if not wiki_text:
#                     return jsonify({"error": "No content found on Wikipedia for this topic."}), 404
#                 text = auto_outline(wiki_text)
#             else:
#                 text = auto_outline(text)

#         output_file = text_to_mindmap(text, output_file="mindmap", format=fmt)
#         mimetype = "image/svg+xml" if fmt == "svg" else "image/png"
#         return send_file(output_file, mimetype=mimetype)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500





from flask import Blueprint, request, send_file, jsonify
from graphviz import Digraph
import spacy
import requests
from collections import defaultdict


mindmap_api = Blueprint("mindmap_api", __name__)
nlp = spacy.load("en_core_web_sm")

# ✅ 1. Direct Wikipedia summary fetch
def fetch_from_wikipedia(query):
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query.replace(' ', '_')}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data.get("extract", "")
        else:
            return ""
    except Exception as e:
        print(f"Error fetching from Wikipedia: {e}")
        return ""

# ✅ 2. Fallback Wikipedia search if direct fetch fails
def fetch_from_wikipedia_with_fallback(query):
    # First try direct fetch
    summary = fetch_from_wikipedia(query)
    if summary:
        return summary

    # Try a more flexible search if direct page does not exist
    search_url = f"https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": query,
        "format": "json"
    }
    try:
        response = requests.get(search_url, params=params)
        if response.status_code == 200:
            search_data = response.json()
            search_results = search_data.get("query", {}).get("search", [])
            if search_results:
                first_title = search_results[0]["title"]
                return fetch_from_wikipedia(first_title)
    except Exception as e:
        print(f"Error during Wikipedia fallback search: {e}")
    
    return ""


# ✅ 3. Smart outline generation
def auto_outline(text: str):
    doc = nlp(text)
    heading = next((ent.text.strip() for ent in doc.ents if ent.label_ in ["GPE", "ORG", "PERSON", "NORP"]), None)
    if not heading:
        heading = next((chunk.text.strip() for chunk in doc.noun_chunks), "Topic")

    outline = defaultdict(list)
    for sent in doc.sents:
        topic = next((ent.label_ for ent in sent.ents), None)
        if not topic and sent.noun_chunks:
            topic = next(sent.noun_chunks).text.strip().split()[0]
        if not topic:
            topic = "General"
        outline[topic].append(sent.text.strip())

    result = [heading]
    for topic, items in outline.items():
        result.append(f"  {topic}")
        for s in items:
            result.append(f"    {s}")
    return "\n".join(result)

# ✅ 4. Convert text outline to mind map
def text_to_mindmap(text, output_file="mindmap", format="svg"):
    lines = [line.rstrip() for line in text.strip().split("\n") if line.strip()]
    dot = Digraph(comment="Mind Map", format=format)
    dot.attr(rankdir='LR', dpi='300')  # Optional: for higher resolution output

    stack = []
    for i, line in enumerate(lines):
        indent = len(line) - len(line.lstrip())
        content = line.strip()
        node_id = f"n{i}"
        dot.node(node_id, content)

        if indent > 0:
            parent = next((n for n in reversed(stack) if n["indent"] < indent), None)
            if parent:
                dot.edge(parent["id"], node_id)
        stack.append({"id": node_id, "indent": indent})

    output_path = output_file + "." + format
    dot.render(filename=output_file, cleanup=True)
    return output_path

# ✅ 5. Mind map generation endpoint
@mindmap_api.route("/generate_mindmap", methods=["POST"])
def generate_mindmap():
    data = request.get_json()
    text = data.get("text")
    fmt = request.args.get("format", "svg").lower()
    auto = request.args.get("auto", "false").lower() == "true"

    if not text:
        return jsonify({"error": "Missing 'text' field"}), 400

    try:
        if auto:
            # For short queries, use Wikipedia with fallback
            if len(text.strip().split()) <= 6:
                wiki_text = fetch_from_wikipedia_with_fallback(text)
                if not wiki_text:
                    return jsonify({"error": "No content found on Wikipedia for this topic."}), 404
                text = auto_outline(wiki_text)
            else:
                text = auto_outline(text)

        output_file = text_to_mindmap(text, output_file="mindmap", format=fmt)
        mimetype = "image/svg+xml" if fmt == "svg" else "image/png"
        return send_file(output_file, mimetype=mimetype)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

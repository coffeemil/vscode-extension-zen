// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

interface Editor {
  editor: vscode.TextEditor;
  lineContent: string;
  position: vscode.Position;
}

// Get Text	Line
function getEditor(): Editor | null {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const position = editor.selection.active;
    const line = position.line;
    const lineContent = editor.document.lineAt(line).text;
    return { editor, lineContent, position };
  } else {
    return null;
  }
}

// request API
async function askAI(question: string): Promise<string> {
  const api_key = "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";

  const params = {
    messages: [
      {
        role: "system",
        content:
          "You are an automatic code writing program,Returns only the js code"
      },
      {
        role: "user",
        content: "Returns only the js code , return function"
      },
      {
        role: "user",
        content: "No special characters"
      },
      {
        role: "user",
        content: question
      }
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7, // random
    max_tokens: 4096 // max token
  };

  const res = await fetch("https://aigptx.top/v1/chat/completions", {
    method: "post",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + api_key
    }
  });
  if (!res.ok) {
    throw new Error("Net Error");
  }

  // response = requests.post(
  //     "https://aigptx.top/v1/chat/completions",
  //     headers=headers,
  //     json=params,
  //     stream=False
  // )
  const data: any = await res.json();
  const result = data["choices"][0]["message"]["content"];

  return result;
}

// output AI Code
function outputCode(editor: Editor, AIResponse: string) {
  const newPosition = editor.position.with(editor.position.line + 1, 0);
  editor.editor.edit((editBuilder) => {
    editBuilder.insert(newPosition, "\n" + AIResponse + "\n");
  });
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "zen.getCurrentLineContent",
    async () => {
      const editor = getEditor();
      // Get the active editor
      if (
        editor &&
        !["	"].includes(editor?.lineContent) &&
        editor?.lineContent.length > 0
      ) {
        const AIResponse = await askAI(editor?.lineContent);
        outputCode(editor, AIResponse);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

interface Editor {
  editor: "";
}

// Get Text	Line
function getTextEditorCurrentLine(): string {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const position = editor.selection.active;
    const line = position.line;
    const nextLinePosition = position.with(line + 1, 0);
    const lineContent = editor.document.lineAt(line).text;
    return lineContent;
  } else {
    return "";
  }
}

// request API
function askAI(comment: string): string {
  return "这是AI回复";
}

// output AI Code
function outputCode(AIResponse: string) {
  vscode.window.showInformationMessage(`调用输出${AIResponse}`);

  //   editBuilder.insert(
  //     linePosition + 1,
  //     `Current line content: ${lineContent}\n`
  //   );
  console.log("调用输出");
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "zen.getCurrentLineContent",
    () => {
      // Get the active editor
      const lineContent = getTextEditorCurrentLine();
      if (!["	"].includes(lineContent) && lineContent.length > 0) {
        const AIResponse = askAI(lineContent);
        outputCode(AIResponse);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

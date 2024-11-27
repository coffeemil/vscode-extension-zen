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
        const AI = require("./AI/index");
        const AIResponse = await AI.request(editor?.lineContent);
        outputCode(editor, AIResponse);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}


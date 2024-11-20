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
function askAI(comment: string): string {
  return "这是AI回复";
}

// output AI Code
function outputCode(editor: Editor, AIResponse: string) {
  vscode.window.showInformationMessage(`调用输出${AIResponse}`);
  const newPosition = editor.position.with(editor.position.line + 1, 0);
  editor.editor.edit((editBuilder) => {
    editBuilder.insert(newPosition, AIResponse + "\n");
  });
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "zen.getCurrentLineContent",
    () => {
      const editor = getEditor();
      // Get the active editor
      if (
        editor &&
        !["	"].includes(editor?.lineContent) &&
        editor?.lineContent.length > 0
      ) {
        const AIResponse = askAI(editor?.lineContent);
        outputCode(editor, AIResponse);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

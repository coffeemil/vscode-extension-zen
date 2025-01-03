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

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// 单行注释AI自动编码
export function activate(context: vscode.ExtensionContext) {
  const generateByLine = vscode.commands.registerCommand(
    "zen.generateByLine",
    async () => {
      const editor = getEditor();
      // Get the active editor
      if (
        editor &&
        !["	"].includes(editor?.lineContent) &&
        editor?.lineContent.length > 0
      ) {
        const AI = require("./AI/index");
        const AIResponse = await AI.requestAutoMaticCodeWriting(
          editor?.lineContent
        );
        // output AI Code
        const newPosition = editor.position.with(editor.position.line + 1, 0);
        editor.editor.edit((editBuilder) => {
          editBuilder.insert(newPosition, "\n" + AIResponse + "\n");
        });
      }
    }
  );

  // 整页文件翻译
  const translatePage = vscode.commands.registerCommand(
    "zen.translatePage",
    async () => {
      const editor = getEditor();
      const document = editor?.editor.document;
      if (document) {
        const AI = require("./AI/index");
        const AIResponse = await AI.requestTranslateIntoCN(document.getText());
        // 替换
        editor.editor.edit((editBuilder) => {
          editBuilder.replace(
            new vscode.Range(0, 0, editor.editor.document.lineCount, 0),
            AIResponse
          );
        });
      }
    }
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

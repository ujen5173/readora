"use client";

import { useCompletion } from "ai/react";
import { ArrowUp, WandSparkles } from "lucide-react";
import { useEditor } from "novel";
import { addAIHighlight } from "novel";
import { useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import AISelectorCommands from "./ai-selector-commands";
import { Command, CommandInput } from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import AICompletionCommands from "./ai-completion-command";
import CrazySpinner from "../crazy-spinner";

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState("");

  const { completion, complete, isLoading } = useCompletion({
    // id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const hasCompletion = completion.length > 0;

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose p-2 px-4 prose-sm">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground">
          <WandSparkles className="mr-2 h-4 w-4 shrink-0  " />
          AI is thinking
          <div className="ml-2 mt-1">
            <CrazySpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={
                hasCompletion
                  ? "Tell AI what to do next"
                  : "Ask AI to edit or generate..."
              }
              onFocus={() => editor && addAIHighlight(editor)}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-rose-500 hover:bg-rose-900"
              onClick={() => {
                if (completion)
                  return complete(completion, {
                    body: { option: "zap", command: inputValue },
                  }).then(() => setInputValue(""));

                const slice = editor?.state.selection.content();
                const text = editor?.storage.markdown.serializer.serialize(
                  slice?.content
                );

                complete(text, {
                  body: { option: "zap", command: inputValue },
                }).then(() => setInputValue(""));
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                // if (editor) editor.chain().unsetHighlight().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands
              onSelect={(value, option) =>
                complete(value, { body: { option } })
              }
            />
          )}
        </>
      )}
    </Command>
  );
}

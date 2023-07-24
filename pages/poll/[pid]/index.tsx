import PollsOptionsEditor from "@ui/components/PollsEditor";
import PollEditorLayout from "@ui/layouts/pollEditor";
import React from "react";

export default function DetailPollPageIndex() {
  return (
    <PollEditorLayout>
      <div className="w-full px-2 overflow-y-auto max-h-full">
        <PollsOptionsEditor/>
      </div>
    </PollEditorLayout>
  );
}

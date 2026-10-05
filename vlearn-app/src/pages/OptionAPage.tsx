import React from 'react';
import { TopNavigation } from '../components/TopNavigation';
import { LeftSyllabus } from '../components/LeftSyllabus';
import { VideoLecturePlayer } from '../components/VideoLecturePlayer';
import { CodeExerciseLab } from '../components/CodeExerciseLab';
import { NotesRightSidebar } from '../components/NotesRightSidebar';

export const OptionAPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-100 text-neutral-800">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Syllabus: Option A uses AI Tutor as the dedicated partner */}
        <LeftSyllabus defaultTab="aitutor" hidePrereqTab={true} />

        {/* Central Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Real Video Player with in-place Chatbot Robot question and border timer */}
            <VideoLecturePlayer
              isOptionA={true}
              helpButtonLabel="Tôi vẫn chưa hiểu"
            />

            {/* Code Exercise Lab sits directly below the video */}
            <CodeExerciseLab
              triggerButtonText="Tôi vẫn chưa hiểu"
            />
          </div>
        </main>

        {/* Notes Right Sidebar */}
        <NotesRightSidebar initialOpen={true} />
      </div>
    </div>
  );
};

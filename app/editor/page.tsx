import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MarkdownEditorPage from "@/components/markdown/editor/markdown-editor-page";


const Dashboard = async () => {
  const session = (await getServerSession(authOptions)) as Session;
  if (!session) {
    redirect("/login");
  }

  return (
    <>
          <div>
            <MarkdownEditorPage />
        </div>
    </>
  );
};

export default Dashboard;

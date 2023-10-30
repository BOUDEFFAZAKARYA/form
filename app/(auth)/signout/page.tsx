import type { Metadata } from "next"
import { Shell } from "@/components/shells/shell"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/pageHeader"
import { LogOutButtons } from "@/components/auth/logoutbutton"

export const metadata: Metadata = {
    title: "Sign out",
    description: "Sign out of your account",
}

function SignOutPage() {
    return (
        <Shell className="max-w-xs ">
            <div className="col-span-4 space-y-4 text-start">
            <div className="items-center text-xl font-bold ">Sign out   </div>

          <div> Are you sure you want to sign out?</div>

          </div>

          <div className="flex items-center ">

            <LogOutButtons />
            </div>
        </Shell>
    )
}

export default SignOutPage
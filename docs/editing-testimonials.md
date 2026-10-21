# Editing testimonials

Testimonials on the website's Testimonials page are managed in the content manager at **https://www.deepmagnam.in/admin**. Until the domain is live, use the site's `.vercel.app` address followed by `/admin`.

## Before you start

- You need a GitHub account, and the site's owner must add you to the website repository with write access.
- Only publish a testimonial if the client has agreed, preferably in writing, to their quote, name and photo appearing on the website. Keep that agreement on file.

## Log in

1. Open `/admin` and click **Login with GitHub**.
2. A GitHub window opens. The first time, click **Authorize** to let the content manager save changes for you.
3. You'll see the **Testimonials** collection. The entry named "EXAMPLE – Jane Doe" is a sample that shows how an entry looks. It's never shown on the site; you can delete it once you've added real ones.

## How changes go live

Each change goes through three stages, shown in the **Workflow** tab at the top:

| Stage | Meaning |
| --- | --- |
| **Drafts** | Saved, but not on the website. |
| **In Review** | Ready for someone else to check. |
| **Ready** | Approved and can be published. |

Nothing changes on the website until a change is **published**. To publish, open the entry and choose **Publish → Publish now**. The site updates about two minutes later.

## Add a testimonial

1. In the **Contents** tab, click **＋ Testimonial**.
2. Fill in the fields:
   - **Client name** (required)
   - **Quote** (required, up to 300 characters). Use the client's wording, and only shorten it with their agreement.
   - **Role** and **Company** (optional).
   - **Photo** (optional). See the photo tips below.
   - **Rating** (optional): 1–5 stars. Leave it empty to show no stars.
   - **Date** (optional): when the client gave the testimonial.
   - **Display order** (optional): 1 is shown first, then 2, and so on. Entries without a number come after the numbered ones, newest first.
   - **Client consent to publish**: turn this on only when the client has agreed.
   - **Published**: turn this on for the testimonial to appear on the website.
3. Click **Save**. The entry is now a draft.
4. When it's ready, use the **Status** menu to move it to **In review**, then **Ready**, then choose **Publish → Publish now**.

A testimonial can't be saved with **Published** on unless **Client consent to publish** is also on. You'll see a red message if you try.

## Edit a testimonial

Open it from the **Contents** tab, make your changes and click **Save**. The live version stays as it is until you publish the change.

## Hide a testimonial

To take a testimonial off the website but keep it for later, open it, turn **Published** off, then save and publish the change. Turn it back on to show it again.

If a client withdraws consent, turn off both **Published** and **Client consent to publish**, and publish the change straight away. You can also delete the entry: open it and choose **Delete published entry**.

## Photo tips

- Use a clear, well-lit photo of the person's face, roughly centred. It's shown as a small circle, and the website crops it to a square from the centre.
- JPG, PNG or WebP, up to 10 MB. iPhone HEIC photos won't work: send them as JPG instead (or set **Settings → Camera → Formats** to **Most Compatible**).
- At least 200 × 200 pixels. There's no need to resize or compress it first; the website makes small, fast versions automatically, and location data stored in photos is removed.
- Only use a photo the client has agreed to, ideally one they sent you.
- To replace a photo, choose **Choose different image** in the entry and upload the new one.

## If something goes wrong

- **A published change doesn't appear after about five minutes:** the website build probably stopped because something in the content is invalid. Tell the site's developer; the build log lists exactly which entry and field to fix.
- **The login window closes but you're not logged in,** or it says the login expired: close it and click **Login with GitHub** again.

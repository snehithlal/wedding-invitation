# 💒 Snehithlal & Krishnapriya - Wedding Invitation Website

A beautiful, modern wedding invitation website to celebrate our special day on **May 10, 2026**.

![Wedding Invitation](https://img.shields.io/badge/Wedding-May%2010%2C%202026-8B1538?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

## ✨ Features

- **Elegant Design**: Modern burgundy and gold color palette
- **Countdown Timer**: Live countdown to the wedding day
- **Responsive**: Looks beautiful on all devices (mobile, tablet, desktop)
- **Smooth Animations**: Scroll-triggered fade-in effects
- **Sections**:
  - Hero with countdown timer
  - Wedding ceremony & reception details
  - Love story timeline
  - Photo gallery (customizable)
  - RSVP integration
  - Contact information

## 🚀 Quick Start - Deploy to GitHub Pages (FREE)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in (or create an account)
2. Click the **"+"** button in the top right → **"New repository"**
3. Name your repository: `wedding-invitation` (or any name you prefer)
4. Set it to **Public**
5. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Open Terminal in the `wed_invitation` folder and run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit - Wedding invitation website"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**

**Your website will be live in 1-2 minutes at:**
```
https://YOUR_USERNAME.github.io/wedding-invitation/
```

## 🎨 Customization Guide

### 1. Update Wedding Details

Edit `index.html` and update:

- **Names**: Line 42-44 (Snehithlal & Krishnapriya)
- **Date**: Line 49 (May 10, 2026)
- **Ceremony Time**: Line 86 (10:00 AM)
- **Reception Time**: Line 94 (6:00 PM)
- **Venue Details**: Lines 104-107

### 2. Add Your Love Story

Edit the timeline section in `index.html` (lines 122-166):
- Update each timeline item with your real story
- Add more items if needed by copying the timeline-item div structure

### 3. Add Photos to Gallery

Replace the placeholder gallery items with real images:

**Option A: Using image files**
```html
<!-- Replace the placeholder-image div with: -->
<div class="gallery-item fade-in-up">
    <img src="images/photo1.jpg" alt="Our photo">
</div>
```

**Option B: Keep placeholders and add photos later**
- You can add photos anytime after deployment!

### 4. Set Up RSVP with Google Forms

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with fields:
   - Name (Short answer)
   - Email (Short answer)
   - Number of Guests (Number)
   - Dietary Restrictions (Paragraph)
   - Any message for the couple (Paragraph)
3. Click **"Send"** → Copy the link
4. In `index.html`, find line 211 and replace `#` with your form link:
```html
<a href="YOUR_GOOGLE_FORM_LINK" class="rsvp-button" id="rsvpButton">
```

### 5. Add Google Maps Link

Once you know the venue:
1. Search for the venue on [Google Maps](https://maps.google.com)
2. Click **"Share"** → **"Copy link"**
3. In `index.html` line 108, uncomment and add your link:
```html
<a href="YOUR_GOOGLE_MAPS_LINK" target="_blank" class="map-button">View on Google Maps</a>
```

### 6. Customize Colors

Edit `styles.css` (lines 6-10) to change the color scheme:
```css
--primary-burgundy: #8B1538;  /* Main color */
--secondary-gold: #D4AF37;     /* Accent color */
--accent-rose: #C77B8F;        /* Secondary accent */
--cream: #FFF8F0;              /* Background */
```

## 📱 Testing Locally

Before deploying, you can test the website locally:

1. Open `index.html` in your web browser
2. Or use a local server:
```bash
# Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000
```

## 🎯 Alternative Free Hosting Options

Besides GitHub Pages, you can also use:

### Netlify (Drag & Drop)
1. Go to [Netlify](https://www.netlify.com)
2. Drag the `wed_invitation` folder to the deploy area
3. Your site is live instantly!

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the folder
3. Follow the prompts

## 📝 Files Structure

```
wed_invitation/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Countdown timer and interactions
└── README.md       # This file
```

## 🔧 Troubleshooting

**Q: The countdown isn't working**
- Check that the date in `script.js` line 26 matches your wedding date
- Make sure it's in the correct format: `'2026-05-10T10:00:00'`

**Q: Styles aren't loading**
- Ensure `styles.css` is in the same folder as `index.html`
- Check the file name is exactly `styles.css` (case-sensitive)

**Q: GitHub Pages shows 404**
- Wait 2-3 minutes after enabling Pages
- Check repository is set to Public
- Verify the branch name is `main` (not `master`)

**Q: Images not showing**
- If using image files, create an `images` folder
- Make sure image paths in HTML match actual file locations

## 💝 After Deployment

1. Share your wedding website URL with guests
2. You can update the content anytime by:
   - Editing the files
   - Committing: `git add . && git commit -m "Update details"`
   - Pushing: `git push`
   - Changes will reflect in 1-2 minutes

## 📞 Need Help?

- Check that all three files (HTML, CSS, JS) are in the same folder
- Ensure file names are exactly: `index.html`, `styles.css`, `script.js`
- Clear your browser cache if you don't see updates (Ctrl+Shift+R or Cmd+Shift+R)

---

**Made with ❤️ for Snehithlal & Krishnapriya**

*Congratulations on your upcoming wedding! 🎉*

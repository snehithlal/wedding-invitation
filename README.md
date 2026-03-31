# Wedding Invitation

A beautiful wedding invitation website for Snehithlal & Krishnapriya's special day on May 10, 2026.

## View the Invitation

Open `index.html` in your web browser to view the wedding invitation.
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

**Made with ❤️ for Snehithlal & Krishnapriya**

*Congratulations on your upcoming wedding! 🎉*

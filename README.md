## \***\*Personal Portfolio Website – A fully responsive, interactive, and animated portfolio website showcasing my work, skills, and experience.\*\***

## 🚀 Tech Stack 💡 Features

1. ##### **HTML5** – <small>_Semantic structure of the webpage_</small>

2. **Tailwind CSS + Custom CSS** – <small>_Responsive layouts using Flexbox/Grid_</small>

3. **JavaScript (ES6+)** – <small>_Dynamic content & interactivity_</small>

4. **GSAP (GreenSock Animation Platform)** – <small>_Smooth and advanced animations_</small>

5. **AOS (Animate on Scroll)** – <small>_Scroll-based animations_</small>

6. **Locomotive Scroll (Upcoming)** – <small>_Smooth scrolling and parallax effects_</small>

7.

#### **Backend Integration (Upcoming)** – <small>_Connection with APIs for contact form & project data`_</small>

<br/>

## 📚 Sections Included

Intro Section – Short welcome and personal introduction

Education & Skills – Academic background and technical skills

Experience – Work and internship experiences

Projects – Highlighted projects with links

Contact – Contact form and social media links

(More UI improvements and sections coming soon)

<br/>
<br/>

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

<br/>
<br/>

# 🔗 Live Preview 💼 Nitenswain Portfolio

👉 Click here to view the portfolio

[![Live Preview](https://img.shields.io/badge/Live--Demo-Click%20Here-blue?style=for-the-badge)](https://niten-12.github.io/Nitenswain-portfolio/)

A modern, responsive, and animated personal portfolio built using HTML5, Tailwind CSS, JavaScript, GSAP, and more.

# Yes! ✅ That message confirms everything is working perfectly.

The popup "Message sent!" is coming from your backend response, so your frontend → backend → MySQL flow is successful. 🎉

🔍 Now: How to Check Data in MySQL
You need to run a simple SQL query to see the stored messages.

✅ 1. Open MySQL Command Line or MySQL Workbench
Option A: Using Command Line
Open terminal:

mysql -u root -p
Enter your MySQL password.

Use your database:

sql

USE portfolio;
Check the data in your table:

sql

SELECT \* FROM contacts;
You’ll see something like:

id name email message created_at
1 John Doe john@example.com Hello there! 2025-05-27 12:40:00

Option B: Using MySQL Workbench (GUI)
If you're using MySQL Workbench:

Open the app and connect to localhost

On the left sidebar, find your portfolio database

Expand → Tables → Right-click on contacts → Select Rows - Limit 1000

It will show a table with your form submissions.

📌 Tip
You can run this any time:

## sql

SELECT \* FROM contacts ORDER BY created_at DESC;

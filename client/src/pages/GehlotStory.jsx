import React from 'react';
import { Link } from 'react-router-dom';

export default function GehlotStory() {
  return (
    <div className="page page-narrow">
      <Link to="/" className="page-back">← Back to Home</Link>
      <div className="page-header"><h1>How Gehlot Started</h1><p>The story behind the name</p></div>

      <div className="glass-card story-card">
        <div className="story-hero">✦</div>

        <div className="story-section">
          <h2>The Beginning</h2>
          <p>
            It all started in an economics class. My teacher, <strong>Himanshu Gehlot</strong>, wasn't just teaching us
            supply and demand curves — he was preparing us for a world that demands more than textbook answers.
            He had this way of making every lesson feel relevant, connecting classroom theory to real life.
            But one conversation changed everything.
          </p>
        </div>

        <div className="story-section">
          <h2>The Spark</h2>
          <p>
            One afternoon, Sir mentioned something that caught my attention. He told us about a student from
            <strong> EMRS (Eklavya Model Residential School)</strong> who had built an AI chatbot. This student,
            not much older than us, created a tool that helped his classmates understand subjects better.
            No big budget, no team, no fancy infrastructure — just a laptop and an idea.
          </p>
          <p>
            "Imagine," Sir said, "a student from a tribal residential school building something that helps
            hundreds of other students learn. That's the power of technology when you combine it with intent."
          </p>
          <p>
            I saw the website right there — Sir had pulled it up on the projector. The whole class was
            watching. The concept was brilliant — an AI that could answer questions, explain concepts,
            and guide students through their doubts. But as I watched, something clicked.
          </p>
        </div>

        <div className="story-section">
          <h2>The Realisation</h2>
          <p>
            The website was simple. Not in a bad way — it was functional, clean, and it worked. The UI was
            basic, the UX was straightforward, and the AI was powered by the ChatGPT API. Nothing about it
            was technically out of reach. It was built by a student, for students, using tools that anyone
            with internet access could learn.
          </p>
          <p>
            I turned to the person next to me and said, <em>"This is easy to do."</em>
          </p>
          <p>
            Right there, in the middle of class, I told Sir the same thing. "Sir, this is simple.
            I can build this." I wasn't trying to be arrogant — I had just looked at it and understood
            exactly how it worked. The UI was basic. The API was straightforward. It was a student project,
            and I was a student who could build it.
          </p>
        </div>

        <div className="story-section">
          <h2>The Doubt</h2>
          <p>
            His response stopped me cold. "You?" he said. That single word carried everything — the doubt,
            the disbelief, the quiet assumption that I wasn't capable of something like this.
          </p>
          <p>
            In that moment, I understood how he saw me. Not as someone who could build. Not as someone
            who could create. Just another student who consumed lessons and gave back answers.
          </p>
          <p>
            I didn't argue. I didn't try to convince him. I just nodded, sat back down, and made a decision.
          </p>
        </div>

        <div className="story-section">
          <h2>The Build</h2>
          <p>
            I worked on it for weeks. Late nights after homework. Weekends when my friends were out playing.
            Every free moment I had, I was learning — React for the frontend, Node.js for the backend, the
            OpenAI API for the AI brain. I made mistakes. I broke things. I rebuilt them.
          </p>
          <p>
            I designed the interface to be clean and welcoming — not just functional, but <em>beautiful</em>.
            I wanted students to open it and feel like they were walking into a friendly classroom, not a
            cold machine. I added features I wished I had when I was stuck on a tough problem. I made it
            personal.
          </p>
          <p>
            And when I was done, I named it <strong>GehlotAI</strong>.
          </p>
        </div>

        <div className="story-section">
          <h2>Why GehlotAI?</h2>
          <p>
            I named it after my economics sir — Himanshu Gehlot. Not out of revenge. Not to prove a point
            (though, yes, maybe a little). I named it GehlotAI because his words, even the ones that doubted
            me, pushed me to build something I never thought I could. He taught me economics, but he also
            — unintentionally — taught me something far more valuable.
          </p>
          <p>
            <strong>Your potential is not defined by what others see in you.</strong>
          </p>
          <p>
            Every time someone types a question into GehlotAI and gets an answer, they're proving that
            knowledge should be accessible to everyone — regardless of which school you go to, which
            city you live in, or what anyone thinks you're capable of.
          </p>
          <p>
            On the inside, the chatbot knows itself as just <strong>Gehlot</strong> — a nod to the name
            that started it all.
          </p>
        </div>

        <div className="story-section">
          <h2>The Result</h2>
          <p>
            GehlotAI worked. Students started using it. They asked questions, learned concepts, solved
            problems. The EMRS student who inspired all of this had built something for his school.
            I built something for anyone who needs it.
          </p>
          <p>
            And one day, I walked back to Sir's classroom. I didn't say "I told you so." I just showed
            him the website running on my phone. He looked at it for a long time. Then he looked at me.
          </p>
          <p>
            He didn't say much. But he didn't need to.
          </p>
        </div>

        <div className="story-section story-epilogue">
          <h2>What GehlotAI Stands For</h2>
          <p>
            GehlotAI is not just a chatbot. It's proof that:
          </p>
          <ul>
            <li>A student from anywhere can build anything</li>
            <li>A doubt can become fuel for creation</li>
            <li>Knowledge should never have a price tag</li>
            <li>The best way to respond to "you can't" is to show "I did"</li>
          </ul>
          <p>
            This website is dedicated to every student who has ever been told they're not enough.
            To every young builder with more determination than resources. And to Himanshu Gehlot —
            for the economics lessons, and for the unexpected one that mattered most.
          </p>
          <p className="story-signoff">
            — A student who built something<br />
            <em>because someone said he couldn't</em>
          </p>
        </div>
      </div>
    </div>
  );
}

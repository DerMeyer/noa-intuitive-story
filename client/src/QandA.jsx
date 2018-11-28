import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <section className="page-container">
                <h3>
                    How do I play?
                </h3>
                <p>
                    You can either Create a Group by gathering 4 other people who’re into the same Traveling Point as you; maybe you share an interest about a culture or a theme? Or you can Join a Group with a random Traveling Point and random people and let the game choose it for you. Either way, <Link style={{ textDecoration: 'none' }} to="/contact">contact</Link> me and we'll take it from there.<br /><br />
                </p>
                <h3>
                    Where can we play?
                </h3>
                <p>
                    Everywhere! I’d love to travel and lead the game all over the world. Gather a Group, invite me and I’ll come.
                </p>
                <h3>
                    What are the requirements?
                </h3>
                <p>
                    Anyone can play. You don’t need previous knowledge in history, writing or anything else. You do need though to dedicate the time and attention for the creative process; this is not just an entertainment/fun/interesting workshop - we’re creating a piece together and it requires some devotion. Whatever happens within the group is unpredictable and depends on the unique combination of the people, the characters and the story itself.
                </p>
                <h3>
                    What do I get out of it?
                </h3>
                <p>
                    The purpose and nature of The Intuitive Story are to explore and deepen the Intuitive Language which touches us all and reminds us that <span>we are one.</span> Everything we do here - serves this. So first of all, I would say - connection; an expansion and deepen of your relationship with yourself, others and reality. Whatever reality is. Although it sounds epic, the Game is a personal and intimate experience.<br /><br />
                    Now, except for being social in an interesting fertile way, during the sessions we’re exploring and experiencing creativity and history but not from the conscious-academic mind, but from the most enigmatic and yet familiar place – our intuition.<br /><br />
                    Everything in the game has to be intuitive, so we’re always curious about letting things reveal themselves instead of forcing them. With the willingness not to know in advance what, how, who, when and so on, we’re practicing uncertainty and patience. We’re very “out and about” towards what is happening instead of “making something happen”. This kind of deep listening is something I find fascinating in every aspect of life. Plus, when we'll eventually execute our stories, there will be a character based on you.<br /><br />
                </p>
                <h3>
                    How much does it cost?
                </h3>
                <p>
                    I don’t know. We decide it together as we go. In keeping with the intuitive state of mind, also the price for participating cannot be fixed. Just as we want the creative details to reveal themselves, the material details are no different. It’s a part of the Game and the practice. Using the
                    <a
                        style={{ textDecoration: 'none' }}
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FD%25C4%2581na%3Ffbclid%3DIwAR3SbZ9lZDlBOpoGArFoYTofSMYw3_oWMe3MDGtNKgVmj0ZVEhiac59raBc&h=AT36-FNTgXDj_S9ORvI-t5hFyc20PeoAcaAtJ_tHP4rmRF9r840maMS2wHs3GYwJiAzdAkdlf16dwtg2Bn_PZXzuNqCrmcrl0UU7N3dXuSx2tcI6KA_VWHCFJPnLrtYM7dpenSH0PeEoNZDBe30"
                    > Dāna </a>
                    method, we can cultivate sharing out of will and trust also when it comes to money. And like a great Vipassana teacher once said: you know you gave enough when it hurts a little.
                </p>
                <h3>
                    Is this some kind of therapy?
                </h3>
                <p>
                    This is not Hypnosis, you are in full awareness and control at all time. If anything, this is more similar to guided-imagination, only we want the journey itself to guid us. To be honest, we don’t need anything to get in touch with our intuition, it is there all the time, available and transmitting, but we’re not so used to hearing it, so the MIND needs a little manipulation - “Hi... we’re going into trance, ooohhh, exciting... ok, I’ll play along...”. That’s all. The trance state is very familiar to us from our daily lives; it happens when we dream and before falling asleep, while being focused on something or while watching a TV serie, reading a book or playing video games. It is basically, being open to “another reality” and allowing it to affect us.
                </p>
                <h3>
                    How long does it take?
                </h3>
                <p>
                    The one-on-one Trance session takes 2 hours and only happens once. Later, as we meet for the Group Sessions, the story need at least 6-9 hours of Brainstorming to be revealed. But like everything in the Game - we find out as we go.<br /><br />
                    There are no rules except for the Intuitive rule. We can’t go wrong; this is an experimental expedition and everything is welcome to be explored.<br /><br />
                    Please feel free to <Link style={{ textDecoration: 'none' }} to="/contact">contact</Link> me (Noa) for any questions, suggestions and intuitive notes.
                </p>
            </section>
        )
    }
}

export default About;

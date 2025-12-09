import styled from "styled-components";
import { heroData } from "@/constants/hero-section";

const Card = () => {
  const instagramLink = heroData.socialLinks.find((s) => s.platform === "Instagram")?.url ?? "#";
  const githubLink = heroData.socialLinks.find((s) => s.platform === "GitHub")?.url ?? "#";
  const linkedinLink = heroData.socialLinks.find((s) => s.platform === "LinkedIn")?.url ?? "#";

  return (
    <StyledWrapper>
      <div className="card">
        <img src="https://uiverse.io/astronaut.png" alt="" className="image" />
        <div className="heading">Connect With Me</div>
        <div className="icons">
          <a
            href={instagramLink}
            target="_blank"
            rel="noreferrer noopener"
            className="instagram"
            aria-label="Instagram"
          >
            <svg
              width={24}
              height={25}
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0459 7.5H17.0559M3.0459 12.5C3.0459 9.986 3.0459 8.73 3.3999 7.72C3.71249 6.82657 4.22237 6.01507 4.89167 5.34577C5.56096 4.67647 6.37247 4.16659 7.2659 3.854C8.2759 3.5 9.5329 3.5 12.0459 3.5C14.5599 3.5 15.8159 3.5 16.8269 3.854C17.7202 4.16648 18.5317 4.67621 19.201 5.34533C19.8702 6.01445 20.3802 6.82576 20.6929 7.719C21.0459 8.729 21.0459 9.986 21.0459 12.5C21.0459 15.014 21.0459 16.27 20.6929 17.28C20.3803 18.1734 19.8704 18.9849 19.2011 19.6542C18.5318 20.3235 17.7203 20.8334 16.8269 21.146C15.8169 21.5 14.5599 21.5 12.0469 21.5C9.5329 21.5 8.2759 21.5 7.2659 21.146C6.37268 20.8336 5.56131 20.324 4.89202 19.6551C4.22274 18.9862 3.71274 18.1751 3.3999 17.282C3.0459 16.272 3.0459 15.015 3.0459 12.501V12.5ZM15.8239 11.94C15.9033 12.4387 15.8829 12.9481 15.7641 13.4389C15.6453 13.9296 15.4304 14.392 15.1317 14.7991C14.833 15.2063 14.4566 15.5501 14.0242 15.8108C13.5917 16.0715 13.1119 16.2439 12.6124 16.318C12.1129 16.392 11.6037 16.3663 11.1142 16.2422C10.6248 16.1182 10.1648 15.8983 9.76082 15.5953C9.35688 15.2923 9.01703 14.9123 8.76095 14.4771C8.50486 14.0419 8.33762 13.5602 8.2689 13.06C8.13201 12.0635 8.39375 11.0533 8.99727 10.2487C9.6008 9.44407 10.4974 8.91002 11.4923 8.76252C12.4873 8.61503 13.5002 8.86599 14.3112 9.46091C15.1222 10.0558 15.6658 10.9467 15.8239 11.94Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer noopener"
            className="github"
            aria-label="GitHub"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 3.5 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 3.5 5.44 5.44 0 0 0 3.5 7.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 17.13V22"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noreferrer noopener"
            className="linkedin"
            aria-label="LinkedIn"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 9.5h4V21H2z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* HOLD THE ASTRONAUT */

  .card {
    position: relative;
    width: 19em;
    height: 25em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1a1a2e;
    color: white;
    font-family: Montserrat;
    font-weight: bold;
    padding: 1em 2em 1em 1em;
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;
    row-gap: 1em;
  }
  .card img {
    width: 12em;
    margin-right: 1em;
    animation: move 10s ease-in-out infinite;
    z-index: 5;
  }
  .image:hover {
    cursor: -webkit-grab;
    cursor: grab;
  }

  .icons svg {
    width: 20px;
    height: 20px;
  }

  .card::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    inset: -3px;
    border-radius: 10px;
    background: radial-gradient(#9370db, transparent, transparent);
    transform: translate(-5px, 250px);
    transition: 0.4s ease-in-out;
    z-index: -1;
  }
  .card:hover::before {
    width: 150%;
    height: 100%;
    margin-left: -4.25em;
  }
  .card::after {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 20px;
    background: rgba(26, 26, 46, 0.9);
    transition: all 0.4s ease-in-out;
    z-index: -1;
  }

  .heading {
    z-index: 2;
    transition: 0.4s ease-in-out;
  }
  .card:hover .heading {
    letter-spacing: 0.025em;
  }

  .heading::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    opacity: 1;
    box-shadow: 220px 118px #fff, 280px 176px #fff, 40px 50px #fff,
      60px 180px #fff, 120px 130px #fff, 180px 176px #fff, 220px 290px #fff,
      520px 250px #fff, 400px 220px #fff, 50px 350px #fff, 10px 230px #fff;
    z-index: -1;
    transition: 1s ease;
    animation: 1s glowing-stars linear alternate infinite;
    animation-delay: 0s;
  }
  .icons::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    opacity: 1;
    box-shadow: 140px 20px #fff, 425px 20px #fff, 70px 120px #fff,
      20px 130px #fff, 110px 80px #fff, 280px 80px #fff, 250px 350px #fff,
      280px 230px #fff, 220px 190px #fff, 450px 100px #fff, 380px 80px #fff,
      520px 50px #fff;
    z-index: -1;
    transition: 1.5s ease;
    animation: 1s glowing-stars linear alternate infinite;
    animation-delay: 0.4s;
  }
  .icons::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    opacity: 1;
    box-shadow: 490px 330px #fff, 420px 300px #fff, 320px 280px #fff,
      380px 350px #fff, 546px 170px #fff, 420px 180px #fff, 370px 150px #fff,
      200px 250px #fff, 80px 20px #fff, 190px 50px #fff, 270px 20px #fff,
      120px 230px #fff, 350px -1px #fff, 150px 369px #fff;
    z-index: -1;
    transition: 2s ease;
    animation: 1s glowing-stars linear alternate infinite;
    animation-delay: 0.8s;
  }
  .card:hover .heading::before,
  .card:hover .icons::before,
  .card:hover .icons::after {
    filter: blur(3px);
  }

  .image:active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .image:active + .heading::before {
    box-shadow: 240px 20px #9370db, 240px 25px #9370db, 240px 30px #9370db,
      240px 35px #9370db, 240px 40px #9370db, 242px 45px #9370db,
      246px 48px #9370db, 251px 49px #9370db, 256px 48px #9370db,
      260px 45px #9370db, 262px 40px #9370db;
    animation: none;
    filter: blur(0);
    border-radius: 2px;
    width: 0.45em;
    height: 0.45em;
    scale: 0.65;
    transform: translateX(9em) translateY(1em);
  }
  .image:active ~ .icons::before {
    box-shadow: 262px 35px #9370db, 262px 30px #9370db, 262px 25px #9370db,
      262px 20px #9370db, 275px 20px #9370db, 275px 24px #9370db,
      275px 28px #9370db, 275px 32px #9370db, 275px 36px #9370db,
      275px 40px #9370db, 275px 44px #9370db, 275px 48px #9370db;
    animation: none;
    filter: blur(0);
    border-radius: 2px;
    width: 0.45em;
    height: 0.45em;
    scale: 0.65;
    transform: translateX(9em) translateY(1em);
  }
  .image:active ~ .icons::after {
    box-shadow: 238px 60px #9370db, 242px 60px #9370db, 246px 60px #9370db,
      250px 60px #9370db, 254px 60px #9370db, 258px 60px #9370db,
      262px 60px #9370db, 266px 60px #9370db, 270px 60px #9370db,
      274px 60px #9370db, 278px 60px #9370db, 282px 60px #9370db,
      234px 60px #9370db, 234px 60px #9370db;
    animation: none;
    filter: blur(0);
    border-radius: 2px;
    width: 0.45em;
    height: 0.45em;
    scale: 0.65;
    transform: translateX(9em) translateY(1.25em);
  }

  .heading::after {
    content: "";
    top: -8.5%;
    left: -8.5%;
    position: absolute;
    width: 7.5em;
    height: 7.5em;
    border: none;
    outline: none;
    border-radius: 50%;
    background: #f9f9fb;
    box-shadow: 0px 0px 100px rgba(147, 112, 219, 0.8),
      0px 0px 100px rgba(0, 217, 255, 0.6), inset #9370db 0px 0px 40px -12px;
    transition: 0.4s ease-in-out;
    z-index: -1;
  }
  .card:hover .heading::after {
    box-shadow: 0px 0px 200px rgba(147, 112, 219, 1),
      0px 0px 200px rgba(0, 217, 255, 0.8), inset #9370db 0px 0px 40px -12px;
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    column-gap: 1em;
    z-index: 1;
  }

  .instagram,
  .github,
  .linkedin {
    position: relative;
    transition: 0.4s ease-in-out;
  }
  .instagram:after,
  .github:after,
  .linkedin:after {
    content: "";
    position: absolute;
    width: 0.5em;
    height: 0.5em;
    left: 0;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(233, 233, 233, 0.5),
      0px 0px 10px rgba(192, 192, 192, 0.5);
    border-radius: 50%;
    z-index: -1;
    transition: 0.3s ease-in-out;
  }
  .instagram svg path,
  .github svg path,
  .linkedin svg path {
    stroke: #808080;
    transition: 0.4s ease-in-out;
  }
  .instagram:hover svg path,
  .github:hover svg path,
  .linkedin:hover svg path {
    stroke: #00d9ff;
  }
  .instagram svg,
  .github svg,
  .linkedin svg {
    transition: 0.3s ease-in-out;
  }
  .instagram:hover svg,
  .github:hover svg,
  .linkedin:hover svg {
    scale: 1.25;
  }
  .instagram:hover:after,
  .github:hover:after,
  .linkedin:hover:after {
    scale: 4;
    transform: translateX(0.09em) translateY(0.09em);
  }

  .instagram::before {
    content: "";
    position: absolute;
    top: -700%;
    left: 1050%;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 4s shootingStar ease-in-out infinite;
    transition: 1s ease;
    animation-delay: 1s;
  }
  .github::before {
    content: "";
    position: absolute;
    top: -1300%;
    left: 850%;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 4s shootingStar ease-in-out infinite;
    animation-delay: 3s;
  }
  .linkedin::before {
    content: "";
    position: absolute;
    top: -2100%;
    left: 850%;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 4s shootingStar ease-in-out infinite;
    animation-delay: 5s;
  }
  .card:hover .instagram::before,
  .card:hover .github::before,
  .card:hover .linkedin::before {
    filter: blur(3px);
  }
  .image:active ~ .icons .instagram::before,
  .image:active ~ .icons .github::before,
  .image:active ~ .icons .linkedin::before {
    animation: none;
    opacity: 0;
  }

  @keyframes shootingStar {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateX(-55em) translateY(0);
      opacity: 1;
    }
    70% {
      transform: translateX(-70em) translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateX(0) translateY(0);
      opacity: 0;
    }
  }

  @keyframes move {
    0% {
      transform: translateX(0em) translateY(0em);
    }
    25% {
      transform: translateY(-1em) translateX(-1em);
      rotate: -10deg;
    }
    50% {
      transform: translateY(1em) translateX(-1em);
    }
    75% {
      transform: translateY(-1.25em) translateX(1em);
      rotate: 10deg;
    }
    100% {
      transform: translateX(0em) translateY(0em);
    }
  }

  @keyframes glowing-stars {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export default Card;

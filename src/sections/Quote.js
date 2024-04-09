import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import styled, { keyframes } from "styled-components";
import SubscribeBackImg from "../assets/Images/to-subscribe.png";
import LogoImg from "../assets/Images/logo.png";

const Section = styled.section`
  width: 100%;
  height: max-content;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MenuContainer = styled.div`
  width: max-content;
  height: max-content;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Subscription = styled.div`
    position: relative;
    float: right;
    background: url(assets/to-subscribe.png) no-repeat;
    background-size: 218px;
    width: 208px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin-right: 20px;
    font-family: chuanqi, sans-serif;
    color: #FFF;
    padding-left: 10px;
    padding-top: 20px;
    padding-bottom: 20px;

    :hover{
      background: url(assets/to-subscribe.png) no-repeat 0 -78px;
      background-size: 218px;
    }
    `
const Menu = styled.div `
    width: 52px;
    height: 52px;
    background: url(assets/menu.png) no-repeat;
    cursor: pointer;
    margin-top: 30px;
    margin-left: 40px;
    margin-bottom: 40px;
    :hover{
      background: url(assets/menu.png) no-repeat -53px 0;
    }
`;
const Logo = styled.img `
    width: 50px;
    height: 50px;
    margin-top: 30px;
    margin-left: 40px;
    margin-bottom: 40px;
`
const TextContainer = styled.div`
  width: max-content;
  height: max-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  color: white;
`;
const moveUp = keyframes`
100%{
    transform: translateY(0);
}
`;

const Text = styled.p`
  font-size: 2rem;
  position: relative;
  height: var(--fontmd);
  overflow: hidden;

  span {
    position: relative;
    transform: translateY(3rem);
    animation-name: ${moveUp};
    animation-duration: 2.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-delay: ${(props) => props.delay};
    font-family: var(--fontL);
    background-image: linear-gradient(-45deg, var(--gradient));
    background-clip: text;
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }

  .author {
    width: 100%;
    text-align: end;
    background-image: linear-gradient(-180deg, var(--gradient));
    font-family: var(--fontR);
  }

  @media screen and (max-width: 70em) {
    width: 70%;
  }

  @media screen and (max-width: 48em) {
    font-size: var(--fontmd);
    height: var(--fontsm);
  }
  @media screen and (max-width: 40em) {
    width: 90%;
  }
  @media screen and (max-width: 30em) {
    font-size: var(--fontxs);
  }
`;

const Quote = () => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let Elem = sectionRef.current;

    let trigger = ScrollTrigger.create({
      trigger: Elem,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <MenuContainer>
        <Menu className="menu"></Menu>
        <Logo src={LogoImg} alt="logo"></Logo>
      </MenuContainer>
      <Subscription className="subscription">Subscription</Subscription>
    </Section>
  );
};

export default Quote;

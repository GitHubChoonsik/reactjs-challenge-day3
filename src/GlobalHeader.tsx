import styled from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import sunIcon from "./img/sun.png";
import moonIcon from "./img/moon.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  max-width: 480px;
  height: 35px;
  margin: 10px auto 0 auto;
`;

const ToggleIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function GlobalHeader() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Container>
      <span onClick={toggleDarkAtom}>
        <ToggleIcon src={isDark ? sunIcon : moonIcon} alt="Toggle darkmode" />
      </span>
    </Container>
  );
}

export default GlobalHeader;

import { ReactComponent as HomeIcon } from "../../icons/homeIcon.svg";
import { ReactComponent as FootBall } from "../../icons/footBall.svg";
import { ReactComponent as ArrowDown } from "../../icons/ArrowDown.svg";
import { ReactComponent as Avatar } from "../../icons/avatar.svg";
import style from "./style.module.scss";
const Header = () => {
  return (
    <div className={style.header_container}>
      <div className={style.header_left}>
        <div>
          <HomeIcon />
        </div>
        <div className={style.left_admin}>Admin Console</div>
        <div className={style.left_view}>Admin View</div>
      </div>
      <div className={style.header_right}>
        <div className={style.right_first}>
          <FootBall />
          Support
        </div>
        <div className={style.right_second}>
          <Avatar />
          John
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};
export default Header;

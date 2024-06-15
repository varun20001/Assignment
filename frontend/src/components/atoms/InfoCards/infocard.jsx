import style from "./style.module.scss";
const InfoCard = ({ count, label }) => {
  return (
    <div className={style.info_wrap}>
      <div className={style.info_wrap_count}>{count}</div>
      <div className={style.info_wrap_label}>{label}</div>
    </div>
  );
};
export default InfoCard;

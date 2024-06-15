import style from "./style.module.scss";
import { ReactComponent as ArrowTop } from "../../icons/SelectTop.svg";
import { ReactComponent as FilterIcon } from "../../icons/filterIcon.svg";
import InfoCard from "../../atoms/InfoCards/infocard";
import { useEffect, useRef, useState } from "react";
const StatsHeader = ({
  data,
  filter,
  setFilter,
  setConfirmFilter,
  confirmfilter,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef(null);
  const date = new Date(data?.recentData?.timestamp);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        // Click outside the filters, close them
        setShowFilters(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  console.log("data :", data.totalCounts);
  const handleDurationCheckboxChange = (value) => {
    setConfirmFilter((prevFilter) => {
      const duration = Array.isArray(prevFilter?.duration)
        ? prevFilter.duration
        : [];

      const currentIndex = duration.indexOf(value);
      const newChecked = [...duration];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      return { ...prevFilter, duration: newChecked };
    });
  };

  const handleMakeCheckboxChange = (value) => {
    console.log("value :", value);

    const cneck = Array.isArray(confirmfilter?.make) ? confirmfilter.make : [];
    const currentIndex = cneck.indexOf(value);
    const newChecked = [...cneck];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setConfirmFilter({ ...confirmfilter, make: newChecked });
  };
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const rejectFilters = () => {
    setFilter({ make: [], duration: [] });
    setConfirmFilter({ make: [], duration: [] });
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    setFilter(confirmfilter);
  };

  return (
    <>
      <div className={style.ineventory_container}>
        <div className={style.inventory_header}>Inventory</div>
        <div className={style.inventory_select_wrap}>
          <div className={style.inventory_dealer}>Select Dealer</div>
          <div className={style.inventory_select}>
            AAA MITSUBISHI DEALER <ArrowTop />
          </div>
          <div style={{ position: "relative" }} ref={filtersRef}>
            <div className={style.inventory_filter} onClick={toggleFilters}>
              <FilterIcon /> FILTER DATA BY
            </div>
            {showFilters && (
              <div
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  borderRadius: "5px",
                }}
                className={style.filter_outer_wrap}
              >
                <div style={{ marginBottom: "10px" }}>
                  <h3>Make:</h3>
                  <label>
                    <input
                      type="checkbox"
                      name="make"
                      value="Jeep"
                      checked={confirmfilter?.make?.includes("Jeep")}
                      onChange={(e) => handleMakeCheckboxChange(e.target.value)}
                    />
                    Jeep
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="make"
                      value="Ford"
                      checked={confirmfilter?.make?.includes("Ford")}
                      onChange={(e) => handleMakeCheckboxChange(e.target.value)}
                    />
                    Ford
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="make"
                      value="Cadillac"
                      checked={confirmfilter?.make?.includes("Cadillac")}
                      onChange={(e) => handleMakeCheckboxChange(e.target.value)}
                    />
                    Cadillac
                  </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <h3>Duration:</h3>
                  <label>
                    <input
                      type="checkbox"
                      name="duration"
                      value="last-month"
                      checked={confirmfilter?.duration?.includes("last-month")}
                      onChange={(e) =>
                        handleDurationCheckboxChange(e.target.value)
                      }
                    />
                    Last Month
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="duration"
                      value="this-month"
                      checked={confirmfilter?.duration?.includes("this-month")}
                      onChange={(e) =>
                        handleDurationCheckboxChange(e.target.value)
                      }
                    />
                    This Month
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="duration"
                      value="last-3-months"
                      checked={confirmfilter?.duration?.includes(
                        "last-3-months"
                      )}
                      onChange={(e) =>
                        handleDurationCheckboxChange(e.target.value)
                      }
                    />
                    Last 3 Months
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="duration"
                      value="last-6-months"
                      checked={confirmfilter?.duration?.includes(
                        "last-6-months"
                      )}
                      onChange={(e) =>
                        handleDurationCheckboxChange(e.target.value)
                      }
                    />
                    Last 6 Months
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="duration"
                      value="this-year"
                      checked={confirmfilter?.duration?.includes("this-year")}
                      onChange={(e) =>
                        handleDurationCheckboxChange(e.target.value)
                      }
                    />
                    This Year
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="duration"
                      value="last-year"
                      checked={confirmfilter?.duration?.includes("last-year")}
                      onChange={(e) =>
                        handleDurationCheckboxChange(e.target.value)
                      }
                    />
                    Last Year
                  </label>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      applyFilters();
                      toggleFilters();
                    }}
                  >
                    Apply Filters
                  </button>
                  <button onClick={rejectFilters}>Reject Filters</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={style.recent_date}
      >{`Recent Gathered Data ${formattedDate}`}</div>
      <div className={style.info_card_wrap}>
        <InfoCard
          label="# New Units"
          count={data?.totalCounts?.NEW.toFixed(0)}
        />
        <InfoCard
          label="New MSRP"
          count={`$${data?.totalMSRP?.NEW?.toFixed(0)}`}
        />
        <InfoCard
          label="New Avg. MSRP"
          count={`$${data?.averageMSRP?.NEW?.toFixed(0)}`}
        />
        <InfoCard
          label="# Used Units"
          count={data?.totalCounts?.USED?.toFixed(0)}
        />
        <InfoCard
          label="Used MSRP"
          count={`$${data?.totalMSRP?.USED?.toFixed(0)}`}
        />
        <InfoCard
          label="Used Avg. MSRP"
          count={`$${data?.averageMSRP?.USED?.toFixed(0)}`}
        />
        <InfoCard
          label="# CPO Units"
          count={data?.totalCounts?.CPO?.toFixed(0)}
        />
        <InfoCard
          label="CPO MSRP"
          count={`$${data?.totalMSRP?.CPO?.toFixed(0)}`}
        />
      </div>
    </>
  );
};
export default StatsHeader;

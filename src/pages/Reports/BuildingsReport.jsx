import "./style.scss";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import BuildingsTab from "../../Components/Processes/BuildingsTab";

const EwaabReport = () => {
    return (
        <div className="list">
        <Sidebar/>
        <div className="listContainer">
            <Navbar/>
            <BuildingsTab/>
        </div>
        </div>
    )
}

export default EwaabReport;
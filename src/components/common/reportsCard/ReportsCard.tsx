import { CssBaseline, Grid } from "@mui/material";
import React from "react";
import BuildingIcon from "../../../assets/images/icons/fi-rr-building.svg";
import PlusIcon from "../../../assets/images/icons/fi-rr-plus.svg";
import PulsIcon from "../../../assets/images/icons/fi-rr-pulse.svg";
import { sales_routes } from "../../../constants/path";
import SectionCard, { ISectionCardProps } from "../sectionCard/SectionCard";
import SectionCardActionBtn from "../sectionCardActionBtn/SectionCardActionBtn";


interface ISalesAnalyticsCardProps extends ISectionCardProps {}

const ReportsCard: React.FC<ISalesAnalyticsCardProps> = (props) => {
    
  return (
    <SectionCard {...props}>
      <CssBaseline />
      <Grid container rowSpacing={1} columnSpacing={2} justifyContent={'center'}>
        <Grid item xs={4} md="auto">
          <SectionCardActionBtn
            sx={{ width: "100%",height:'100%' }}
            title="Qo'shish"
            icon={<img src={PlusIcon} alt="Plus" />}
            link={sales_routes.productAdd}
          />
        </Grid> 
        <Grid item xs={4} md="auto">
          <SectionCardActionBtn
            sx={{ width: "100%",height:'100%' }}
            title="Sotuv tarixi"
            icon={<img src={PulsIcon} alt="Plus" />}
            link={sales_routes.salesHistory}
          />
        </Grid> 
        <Grid item xs={4} md="auto">
          <SectionCardActionBtn
            sx={{ width: "100%",height:'100%' }}
            title="Hisobotlar"
            icon={<img src={BuildingIcon} alt="Plus" />}
          />
        </Grid> 
      </Grid>
    </SectionCard>
  );
};

export default ReportsCard;

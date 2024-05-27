import { CssBaseline, Grid } from "@mui/material";
import React from "react";
import { ICashierBalance } from "../../../../app/services/cashier/balance/balance";
import ShoppingBankIcon from "../../../../assets/images/icons/fi-rr-bank.svg";
import ShoppingWalletIcon from "../../../../assets/images/icons/fi-rr-box-alt.svg";
import ShoppingCreditCardIcon from "../../../../assets/images/icons/fi-rr-credit-card.svg";
import ShoppingDollorIcon from "../../../../assets/images/icons/fi-rr-dollar.svg";
import formatCommaNum from "../../../../util/formatCommaNum";
import SectionCard, {
  ISectionCardProps,
} from "../../../common/sectionCard/SectionCard";
import SectionCardBtn from "../../../common/sectionCardBtn/SectionCardBtn";

interface ICashierAnalyticsCardProps extends ISectionCardProps {
  data: ICashierBalance | null
}

const CashierAnalyticsCard: React.FC<ICashierAnalyticsCardProps> = (props) => {
  return (
    <SectionCard {...props}>
      <CssBaseline />
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} sm={"auto"}>
          <SectionCardBtn
            sx={{ width: "100%" }}
            title="Naqd"
            caption={`${formatCommaNum.formatNumber(props.data?.naqd||"")} so'm`}
            icon={<img src={ShoppingWalletIcon} alt="Cube" />}
          />

        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <SectionCardBtn
            sx={{ width: "100%" }}
            title="Usd"
            caption={`${formatCommaNum.formatNumber(props.data?.usd||"")} $`}
            icon={<img src={ShoppingDollorIcon} alt="Cube" />}
          />
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <SectionCardBtn
            sx={{ width: "100%" }}
            title="Bank"
            caption={`${formatCommaNum.formatNumber(props.data?.bank||"")} so'm`}
            icon={<img src={ShoppingBankIcon} alt="Cube" />}
          />
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <SectionCardBtn
            sx={{ width: "100%" }}
            title="Karta"
            caption={`${formatCommaNum.formatNumber(props.data?.card||"")} so'm`}
            icon={<img src={ShoppingCreditCardIcon} alt="Cube" />}
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

export default CashierAnalyticsCard;

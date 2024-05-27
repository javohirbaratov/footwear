import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertFinish from "../../../components/common/alertFinish/AlertFinish";
import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import { sales_routes } from "../../../constants/path";
import SalesOrderAddSelectProduct, { TActiveCard } from "./components/productSelect/SalesOrderAddSelectProduct";
import MyStepper from "../../../components/common/stepper/MyStepper";
import SalesOrderSelecttedProductsList from "./components/SelecttedProductsList/SalesOrderSelecttedProductsList";
import SalesUserList from "./components/userList/SalesUserList";


// Steps
const steps = ["Mijozlar", "Mahsulot", "Ko'rish", "Finish"];

const SalesOrderAdd: React.FC = () => {
  // State
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [selectProducts, setSelectProducts] = useState<TActiveCard[] | null>(null);
  const [selectUserId, setSelectUserId] = useState(null);
  // Navigate
  const navigate = useNavigate();

  const btnOnPress = useCallback(() => {
    navigate(sales_routes.order);
  }, [navigate]);

  const isStepSkipped = useCallback((step: number) => {
    return skipped.has(step);
  }, [skipped]);
  
  // Next Step
  const handleNext = useCallback(() => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

  }, [activeStep, isStepSkipped, skipped]);

  // Back Step
  const handlePrevStep = useCallback((index: number) => {

    if (index < activeStep && activeStep !== 3) {
      setActiveStep(index);
    } else {
      return
    }
  }, [activeStep]);


  return (
    <>

      {/* Header */}
      <MainHeader backTitle="Buyurtmalar" backOnPress={btnOnPress} />

      <MainLayoutContent>
        {/* Stepper  */}
        <MyStepper steps={steps} activeStep={activeStep} setActiveStep={handlePrevStep} />

        {activeStep === 0 ? (
          <>
            <SalesUserList handleNext={handleNext} setSelectUser={setSelectUserId}/>
          </>
        ) : activeStep === 1 ? (
          <SalesOrderAddSelectProduct handleNext={handleNext} setSelectProducts={setSelectProducts}/>
        ) : activeStep === 2 ? (
          <SalesOrderSelecttedProductsList handleNext={handleNext} products={selectProducts} userId={selectUserId}/>
        ) : activeStep === 3 && (
          <AlertFinish toNavigate={sales_routes.order} btnTxt={"Buyurtmalar"} caption="Buyurtma muvaffaqiyatli qabul qilindi"/>
        )
        }

      </MainLayoutContent>
    </>
  );
};

export default SalesOrderAdd;

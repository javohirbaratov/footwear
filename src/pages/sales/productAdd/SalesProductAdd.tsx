import React, { useCallback, useMemo, useState } from 'react';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import MyStepper from '../../../components/common/stepper/MyStepper';
import { useNavigate } from 'react-router-dom';
import { sales_routes } from '../../../constants/path';
import ProductAddStepFrist from './components/ProductAddStepFrist';
import ProductAddStepSecond, { IActiveProducts } from './components/ProductAddStepSecond';
import ProductAddStepThrid from './components/ProductAddStepThrid';
import AlertFinish from '../../../components/common/alertFinish/AlertFinish';

// Steps
const steps = ["Kategoriya", "Mahsulot", "Miqdor", "Finish"];

const SalesProductAdd: React.FC = () => {
  // State
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [selectProducts, setSelectProducts] = useState<IActiveProducts[]>([]);

  // Navigate
  const navigate = useNavigate();

  // useMemo
  const selectProductsData = useMemo(() => {
    return selectProducts
  }, [selectProducts])

  // handle prev page
  const handlePrevPage = useCallback(() => {
    navigate(sales_routes.productByCategory);
  }, [navigate]);

  // check is step skipped
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

  const NextStepChangeCategoryId = useCallback((categoryId: number) => {
    setCategoryId(categoryId);
    handleNext();
  }, [handleNext])

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
      <MainHeader backTitle="Kategoriyalar" backOnPress={handlePrevPage} />

      <MainLayoutContent>
        {/* Stepper  */}
        <MyStepper steps={steps} activeStep={activeStep} setActiveStep={handlePrevStep} />

        {activeStep === 0 ? (
          <>
            <ProductAddStepFrist handleNext={NextStepChangeCategoryId} />
          </>
        ) : activeStep === 1 ? (
          <ProductAddStepSecond selectedCategory={categoryId} handleNext={handleNext} setSelectProducts={setSelectProducts} />  // useCalback ga olish kerak        
        ) : activeStep === 2 ? (
          <ProductAddStepThrid selectProducts={selectProductsData} handleNext={handleNext}/>
        ) : activeStep === 3 && (
          <AlertFinish toNavigate={sales_routes.productByCategory} btnTxt={"Mahsulotlar"} caption="Yuk muvaffaqiyatli qabul qilindi."/>
        )
        }

      </MainLayoutContent>
    </>
  );
};

export default SalesProductAdd;
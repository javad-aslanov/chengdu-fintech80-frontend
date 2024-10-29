import React from 'react';
import TableOne from '../../components/Tables/TableOne';
import RiskAndFinancialStats from '../UiElements/RiskAndFinancialStats.tsx';

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Table displaying other information */}
        <div className="col-span-full ">
          <TableOne />
        </div>

        {/* Risk and Financial Statistics */}
        <div className="col-span-full">
          <RiskAndFinancialStats />
        </div>
      </div>
    </>
  );
};

export default ECommerce;

import React from 'react';

export const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx}>
          <td>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="skeleton" style={{ width: '38px', height: '38px', borderRadius: '50%' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div className="skeleton" style={{ width: '120px', height: '14px' }}></div>
                <div className="skeleton" style={{ width: '80px', height: '10px' }}></div>
              </div>
            </div>
          </td>
          <td><div className="skeleton" style={{ width: '150px', height: '14px' }}></div></td>
          <td><div className="skeleton" style={{ width: '110px', height: '14px' }}></div></td>
          <td><div className="skeleton" style={{ width: '90px', height: '14px' }}></div></td>
          <td><div className="skeleton" style={{ width: '70px', height: '22px', borderRadius: '12px' }}></div></td>
          <td><div className="skeleton" style={{ width: '70px', height: '30px' }}></div></td>
        </tr>
      ))}
    </>
  );
};

export default SkeletonLoader;

import React from 'react';

function TableData({user}) {
  return (
    <div className='w-full'>
      <table className="w-full">
        <tbody>
          <tr>
            <th><div className="cell-box">Username</div></th>
            <td className='text-center'><div className='cell-box'>{user.username}</div></td>
          </tr>
          <tr>
            <th><div className="cell-box">UserId</div></th>
            <td className='text-center'><div className='cell-box'>{user.id}</div></td>
          </tr>
          <tr>
            <th><div className="cell-box">Institute Id</div></th>
            <td className='text-center'><div className='cell-box'>{user.institute.id}</div></td>
          </tr>
          <tr>
            <th><div className="cell-box">Email Id</div></th>
            <td className='text-center'><div className='cell-box'>{user.email}</div></td>

          </tr>
          <tr>
            <th><div className="cell-box">Role</div></th>
            <td className='text-center'><div className='cell-box'>{user.authorities[0].authority}</div></td>
          </tr>
          <tr>
            <th><div className="cell-box">Status</div></th>
            <td className='text-center'><div className='cell-box'>{user.enabled === true ? "ACTIVE": "INACTIVE"}</div></td>
          </tr>
          <tr>
            <th><div className="cell-box">Institute Name</div></th>
            <td className='text-center'><div className='cell-box'>{user.institute.name}</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableData;

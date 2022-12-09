import React from "react";

function Contibutor({users}) {
  return (
    <div>
      <div className="p-4 bg-slate-200 overflow-y-scroll">
        <p className="text-center p-2 text-blue-600 text-xl font-bold">
          Contributors
        </p>
        
        { users ? <div>
            <div>
              {users.map(({name}) => {
                return (
                  <div
                    className="grid grid-cols-[60px_1fr] mb-3 items-center" key={name}>
                    <div>
                        {name}
                    </div>
                  </div>
                );
              })}
            </div>
        </div> : null }
      </div>
    </div>
  );
}

export default Contibutor;

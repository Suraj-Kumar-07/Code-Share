const codes=[];

export function removecode(room){
    const ind=codes.findIndex((code)=>{return code.room===room});
    if(ind!==-1){
         codes.splice(ind,1)[0];
    }
}

export function addcode(room,source,inp,out){
    room=room.trim().toLowerCase();
    const code={room,source,inp,out};
    codes.push(code);
}


export const getcode=(room)=>{
    if(codes.length===0)
    return {err:"empty"};
    const code= codes.find((code)=>code.room===room);
    return {code};
}
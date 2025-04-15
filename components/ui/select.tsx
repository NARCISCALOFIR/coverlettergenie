
export const Select = ({ children, value, onValueChange }: any) => (
  <select className="p-2 w-full border rounded-xl" value={value} onChange={e => onValueChange(e.target.value)}>
    {children}
  </select>
);
export const SelectItem = ({ children, value }: any) => (
  <option value={value}>{children}</option>
);

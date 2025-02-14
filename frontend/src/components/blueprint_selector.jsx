export default function BlueprintSelector({ data, handleSelect }) {
    return <select
        id="blueprint-selector"
        name="blueprint-selector"
        className="m-2 text-sm"
        onChange={handleSelect}>
        {data.map((item) => <option
            key={item.id}
            value={item.id}>{item.name} ({item.area_amount}x{item.area_amount} areas of size {item.area_size}x{item.area_size})</option>)}
    </select>
}
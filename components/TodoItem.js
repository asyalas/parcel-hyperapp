import { h, app } from 'hyperapp' //必须要引入
export default   ({done,id,toggle,value}) => {
    return (
        <li
            class={done && "done"}
            onclick={e =>
                toggle({
                    value: done,
                    id: id
                })
            }
        >
            {value}后缀
        </li>
    )
}
import styled from "@emotion/styled"

const SearchBar = styled.input`
    padding:12px;
    min-width:200px;
`

export default function SearchBarComponent({filter}) {
    return <SearchBar placeholder="Search something" onInput={e => {
        const input = e.target.value
        filter(input)
    }}/>
}
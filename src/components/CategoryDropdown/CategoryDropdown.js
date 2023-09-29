import styled from "@emotion/styled";




const Select = styled.select`
    padding:12px;
    min-width:200px;
    margin-right:auto;
`

const Option = styled.option`
    font-weight:bold;
    transform:rotate(90deg) !important;
`

const categories = [
    "Mexican", "Indian", "French", "Italian", "American"
]


const categoryTagByCategory = (category) => {
    switch(category) {
        case "Mexican":
            return "mexican";
        case "Indian":
            return "indian";
        case "French":
            return "french";
        case "Italian":
            return "italian";
        case "American":
            return ""                
    }
    return ""
}

export default function CategoryDropdown({ selected, setCategory }) {


    return <Select onInput={(e) => setCategory(categoryTagByCategory(e.target.value))}>
        {categories.map((category,index) => <Option key={category}>{category}</Option>)}
    </Select>
}
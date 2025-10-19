import { Navigation } from "./navigation"
import { Toggle } from "./toggle"
import { Wrapper } from "./warpper"

export const Sidebar = async() => {
    return(
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                {/* <Following data={following}/>
                <Recommended data={ recommended }  /> */}
                <Navigation />
            </div>
        </Wrapper>
    )
}
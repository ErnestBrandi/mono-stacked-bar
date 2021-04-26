import React from "react"
import MonoStackedBar from "mono-stacked-bar"
import "mono-stacked-bar/dist/index.css"

const App = () => {
  return (
    <>
      <p>Most simple</p>
      <MonoStackedBar data={[10, 20, 15]} />
      <p>Type of color / luminosity</p>
      <MonoStackedBar data={[10, 20, 15]} color="green" luminosity="bright" />
      <p>Custom colors</p>
      <MonoStackedBar
        data={[
          { value: 10, color: "#fd4949" },
          { value: 20, color: "#fba73b" }
        ]}
      />
      <p>Without custom unit</p>
      <MonoStackedBar data={[50, 20, 30]} unit="%" />
      <p>Without label</p>
      <MonoStackedBar data={[10, 10, 10]} displayLabels={false} />
      <p>With caption</p>
      <MonoStackedBar
        data={[
          { value: 12, caption: "Men" },
          { value: 14, caption: "Women" },
          { value: 4, caption: "Other gender" }
        ]}
      />
      <p>Without radius + height + maxWidth</p>
      <MonoStackedBar data={[10, 10, 10]} radius={0} height={30} width={400} />
    </>
  )
}

export default App

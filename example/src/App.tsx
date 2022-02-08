import React from "react"
import MonoStackedBar from "mono-stacked-bar"
import "mono-stacked-bar/dist/index.css"

const App = () => {
  const colors = ["#393986", "#6767aa", "#56b5b5"]
  return (
    <>
      <p>Most simple</p>
      <MonoStackedBar data={[10, 20, 15]} />
      <p>Light colors</p>
      <MonoStackedBar
        labelColor="black"
        data={[
          { value: 10, color: "#fd4949" },
          { value: 20, color: "#fba73b" }
        ]}
      />
      <p>Without custom unit</p>
      <MonoStackedBar data={[50, 20, 30]} unit="%" colors={colors} />
      <p>Without label</p>
      <MonoStackedBar
        data={[10, 10, 10]}
        displayLabels={false}
        colors={colors}
      />
      <p>With caption</p>
      <MonoStackedBar
        data={[
          { value: 12, caption: "Men" },
          { value: 14, caption: "Women" },
          { value: 4, caption: "Other gender" }
        ]}
        colors={colors}
      />
      <p>Without radius + height + maxWidth</p>
      <MonoStackedBar
        data={[10, 10, 10]}
        radius={0}
        height={30}
        width={400}
        colors={colors}
      />
    </>
  )
}

export default App

import React from "react"
import randomcolor from "randomcolor"
import styles from "./styles.module.css"

interface BarData {
  value: number
  color?: string
  caption?: string
}

interface MonoStackedBarProps {
  data: (number | BarData)[]
  color?: string
  luminosity?: "bright" | "light" | "dark"
  displayLabels?: boolean
  unit?: string
  width?: number
  height?: number
  radius?: number
}

const isNumber = (data: number | BarData): boolean => {
  return typeof data === "number"
}

const getSectionValue = (section: number | BarData): number => {
  return isNumber(section) ? (section as number) : (section as BarData).value
}

const getSectionColor = (section: number | BarData): string | undefined => {
  return isNumber(section) ? undefined : (section as BarData).color
}

function isBarDataValues<BarData>(arr: (number | BarData)[]): arr is BarData[] {
  if (!Array.isArray(arr)) {
    return false
  }
  if (!arr.every((elt: number | BarData) => typeof elt !== "number")) {
    return false
  }
  return true
}

const toPx = (size: number | undefined): string | undefined => {
  if (!size) return undefined
  return `${size}px`
}

const capitalize = (s: string): string => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function MonoStackedBar({
  data,
  color = "blue",
  luminosity = "dark",
  unit = "",
  displayLabels = true,
  width,
  height = 20,
  radius = 10
}: MonoStackedBarProps): JSX.Element {
  const sumValues = data.length
    ? data.map((section) => getSectionValue(section)).reduce((a, b) => a + b)
    : 1
  const colors = randomcolor({
    hue: color,
    luminosity: luminosity,
    count: data.length
  })

  return (
    <div
      style={{
        maxWidth: toPx(width)
      }}
      className={styles.root}
    >
      <div className={styles.stackedBar}>
        {data.length &&
          data.map((section, index) => {
            const radiusPx = toPx(radius)
            const proportion = (getSectionValue(section) * 100) / sumValues
            return (
              <div
                key={index}
                style={{
                  width: `${proportion}%`,
                  height: toPx(height),
                  borderRadius:
                    data.length === 1 || proportion === 100
                      ? radiusPx
                      : index === 0
                      ? `${radiusPx} 0 0 ${radiusPx}`
                      : index === data.length - 1
                      ? `0 ${radiusPx} ${radiusPx} 0`
                      : "0",
                  backgroundColor: getSectionColor(section) || colors[index]
                }}
                className={styles.section}
              >
                {displayLabels && proportion > 10 && (
                  <span
                    style={{
                      fontSize: toPx(height - height / 10),
                      color: luminosity === "light" ? "black" : "white"
                    }}
                    className={styles.sectionLabel}
                  >
                    {`${Math.round(getSectionValue(section))}${unit}`}
                  </span>
                )}
              </div>
            )
          })}
      </div>
      <div className={styles.caption}>
        {isBarDataValues(data) &&
          data.filter((section) => section.caption).length > 0 &&
          data.map((section, index) => {
            if (!section.caption) return <React.Fragment />
            const proportion = (getSectionValue(section) * 100) / sumValues
            if (proportion < 10) return <React.Fragment />
            return (
              <div
                key={index}
                style={{
                  width: `${proportion}%`,
                  fontSize: toPx(height - height / 3)
                }}
              >
                {capitalize(section.caption)}
              </div>
            )
          })}
      </div>
    </div>
  )
}

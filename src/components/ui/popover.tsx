import { View } from "react-native";

function Popover({ children }: { children?: React.ReactNode }) { return <View>{children}</View>; }
function PopoverTrigger({ children }: { children?: React.ReactNode }) { return <View>{children}</View>; }
function PopoverContent({ children, style }: { children?: React.ReactNode; style?: any }) { return <View style={style}>{children}</View>; }
function PopoverAnchor({ children }: { children?: React.ReactNode }) { return <View>{children}</View>; }

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

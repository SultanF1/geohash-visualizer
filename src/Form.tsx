import {useSearchParams} from "react-router-dom";
import {Input, Col, Row, Button} from 'antd';
import './index.css'
import {useState} from "react";

function Form() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [geohashInput, setGeohashInput] = useState<boolean>(true);


    const handleSubmit = (geohash: string) => {
        setSearchParams({geohash: geohash});
    };

    const clearGeohash = () => {
        searchParams.delete("geohash")
        searchParams.set("north", "")
        searchParams.set("south", "")
        searchParams.set("east", "")
        searchParams.set("west", "")
        setSearchParams(searchParams)
    }

    const clearCoordinates = () => {
        searchParams.delete("north")
        searchParams.delete("south")
        searchParams.delete("east")
        searchParams.delete("west")
        searchParams.set("geohash", "")
        setSearchParams(searchParams)
    }


    return (
        <>
            {geohashInput ?
                <div className={"center-bottom"}>
                    <Input
                        type="text"
                        value={searchParams.get("geohash") || ""}
                        onChange={(e) => {
                            handleSubmit(e.target.value)
                        }}
                        placeholder="Enter a geohash"
                        style={{width: "17%"}}
                    />
                </div> :
                <Row className={"center-coordinates"}>
                <Col span={24}>
                    <Row justify="center">
                        <Input
                            type="text"
                            placeholder="north (max lat)"
                            style={{width: "17%"}}
                            onChange={(e) => {
                                    searchParams.set("north", e.target.value)
                                    setSearchParams(searchParams)
                            }}
                        />
                    </Row>

                    <Row justify="space-evenly">
                        <Input
                            type="text"
                            placeholder="west (min lng)"
                            style={{width: "17%"}}
                            onChange={(e) => {
                                searchParams.set("west", e.target.value)
                                setSearchParams(searchParams)
                            }}
                        />
                        <Input
                            type="text"
                            placeholder="east (max lng)"
                            style={{width: "17%"}}
                            onChange={(e) => {
                                searchParams.set("east", e.target.value)
                                setSearchParams(searchParams)
                            }}
                        />
                    </Row>

                    <Row justify="center">
                        <Input
                            type="text"
                            placeholder="south (min lat)"
                            style={{width: "17%"}}
                            onChange={(e) => {
                                searchParams.set("south", e.target.value)
                                setSearchParams(searchParams)
                            }}
                        />
                    </Row>
                </Col>
                </Row>
            }
            <div className={"center-bottom-small"}>
                <Button
                    onClick={() => {
                        setGeohashInput(!geohashInput)
                        geohashInput ? clearGeohash() : clearCoordinates()
                    }}
                    type="default"
                    style={{width: "17%", backgroundColor: "white"}}
                >
                    {geohashInput ? "Coordinates" : "Geohash"}
                </Button>
            </div>
        </>
    );
}

export default Form;
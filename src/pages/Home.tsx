import React, {useEffect, useState} from 'react';
import Backendless from "backendless";

const Home = () => {

    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp('68681B48-AF70-FFE5-FF71-B435F4D4C700', 'BFB78BE0-BA3A-4875-8B16-AEFAD7D7659C');

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("qdwdwq")
    const [age, setAge] = useState("")
    const [country, setCountry] = useState("")
    const [gender, setGender] = useState("")
    const reg = () => {
        const user = new Backendless.User()
        user.email = email
        user.password = password
        // @ts-ignore
        user.name = name
        // @ts-ignore
        user.age = age
        // @ts-ignore
        user.country = country
        // @ts-ignore
        user.gender = gender
        Backendless.UserService.register(user).then((response) => {
            Backendless.Files.upload("reg.txt", `users/${name}`)
            Backendless.Files.upload("reg.txt", `users/${name}/sharedWithMe`)
        })
    }

    const [emailLog, setEmailLog] = useState("")
    const [passwordLog, setPasswordLog] = useState("")

    const log = () => {
        Backendless.UserService.login(emailLog, passwordLog, true).then((response: any) => {
            console.log(response)
        }).catch((e) => {
            alert(e)
        })
    }

    // const log = () => {
    //     let online = 0
    //     Backendless.Data.of("Statistic").findById({objectId: "EBC44CCC-B3FF-4F67-881B-D2F6CF913089"})
    //         .then((response) => {
    //             // @ts-ignore
    //             console.log(response.online)
    //             // @ts-ignore
    //             online = response.online
    //             const r = Backendless.UserService.login(emailLog, passwordLog, true).then((response2) => {
    //                 // @ts-ignore
    //                 console.log(online)
    //                 // @ts-ignore
    //                 console.log(response.online)
    //                 Backendless.Data.of("Statistic").save({
    //                     objectId: "EBC44CCC-B3FF-4F67-881B-D2F6CF913089",
    //                     // @ts-ignore
    //                     online: online + 1
    //                 })
    //             })
    //         })
    // }




    const help = () => {
        Backendless.UserService.restorePassword("tank12358@gmail.com").then((response) => {
            console.log(response)
        })
    }

    const [image, setImage] = useState<any>("")

    console.log(name)

    const handleFile = () => {
        Backendless.Files.upload(image, `users/${name}`).then((response) => {
            console.log(response)
        })
    }

    const [nameFolder, setNameFolder] = useState("")

    const createFolder = () => {
        Backendless.Files.upload("reg.txt", `users/${name}/${nameFolder}`).then((response) => {

        }).catch((e) => {
            alert(e)
        })
    }

    const [nameFolderDelete, setNameFolderDelete] = useState("")

    const deleteFolder = () => {
        Backendless.Files.remove(`users/${name}/${nameFolderDelete}`)
    }

    const [list, setList] = useState<any>()

    const fetchList = () => {
        Backendless.Files.listing(`users/${name}/sharedWithMe`).then((response) => {
            setList(response)
        })
    }
    console.log(list)

    useEffect(() => {
        Backendless.UserService.isValidLogin().then(response => {
            console.log(response)
        })
    }, [])

    useEffect(() => {
        Backendless.UserService.getCurrentUser().then((response: any) => {
            console.log(response)
            // setName(response.name)
            // setAge(response.age)
            // setCountry(response.country)
            // setGender(response.gender)
        })
    }, [])

    return (
        <div className="App">
            <header className="App-header">

                <div style={{marginBottom: "10px"}}>Регистрация</div>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setPassword(e.target.value)} value={password}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setName(e.target.value)} value={name}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setAge(e.target.value)} value={age}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setCountry(e.target.value)} value={country}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setGender(e.target.value)} value={gender}/>
                <button onClick={reg}>Reg</button>


                <div>Вход</div>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setEmailLog(e.target.value)} value={emailLog}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}}
                       onChange={(e) => setPasswordLog(e.target.value)} value={passwordLog}/>
                <button onClick={log}>Log</button>


                <button onClick={help}>Help</button>

                {image &&
                <img src={URL.createObjectURL(image)} style={{width: "100px", height: "100px", objectFit: "contain"}}
                     alt="product-img"/>
                }
                <input type="file" onChange={
                    (e) => setImage(e.target.files && e.target.files[0])
                }/>
                <button onClick={handleFile}>send file</button>

                <div>Create folder</div>
                <input placeholder="name folder/file" value={nameFolder}
                       onChange={(e) => setNameFolder(e.target.value)}/>
                <button onClick={createFolder}>Create folder</button>

                <div>Delete folder/file by name</div>
                <input placeholder="delete folder" value={nameFolderDelete}
                       onChange={(e) => setNameFolderDelete(e.target.value)}/>
                <button onClick={deleteFolder}>Delete folder</button>

                <button onClick={fetchList}>get list</button>
                <div style={{display: "flex", alignItems: "center"}}>
                    {list?.map((item: any) =>
                        <div>
                            <iframe src={item.publicUrl} style={{width: "200px", height: "200px"}}/>
                            <a href={item.publicUrl}>{item.name}</a>
                        </div>
                    )}
                </div>

            </header>

        </div>
    );
};

export default Home;
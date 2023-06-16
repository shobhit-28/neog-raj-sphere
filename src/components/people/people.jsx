import { useContext } from 'react'

import { IoPersonAdd } from 'react-icons/io5'
import { TfiClose } from 'react-icons/tfi'

import './people.css'
import { UserDataContext } from '../../contexts/userDataContext'
import { Loader } from '../../components/loader/loader'
import { PeopleComponent } from '../peopleComponent/peopleComponent'
import { AuthContext } from '../../contexts/AuthContext'

export const People = () => {
    const { allUsersData, isMobileViewOpen, setIsMobileViewOpen, setIsPostModalOpen } = useContext(UserDataContext)
    const { isLoggedIn } = useContext(AuthContext)

    const toggleMobileViewClickHandler = () => {
        setIsMobileViewOpen(!isMobileViewOpen)
        setIsPostModalOpen(false)
    }

    return (
        <>
            {isLoggedIn &&
                <>
                    <div className="people-desktop-view">
                        {allUsersData?.length === 0
                            ?
                            <Loader />
                            :
                            <div className="data-container">
                                <PeopleComponent />
                            </div>
                        }
                    </div>
                    <>
                        {isMobileViewOpen &&
                            <div className="people-mobile-view">
                                <div className="people-mobile-view-modal">
                                    <PeopleComponent />
                                </div>
                            </div>
                        }
                    </>
                    <button className="toggle-people-mobile-view" onClick={() => toggleMobileViewClickHandler()}>
                        {!isMobileViewOpen ? <IoPersonAdd /> : <TfiClose />}
                    </button>
                </>
            }
        </>
    )
}
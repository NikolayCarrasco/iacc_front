import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ConfigProvider, Table } from "antd"
import { useRouter } from "next/router"
import { Curso } from "../entities/curso.entity"
import { environment } from "../../enviroments/enviroment"
import { colorTable } from "../styles/iacc-theme"
import { cursosTableStructure } from "../structure/cursos-table"


export const getServerSideProps: GetServerSideProps<{ cursos: Curso[] }> = async () => {
  try {
    const res = await fetch(`${environment.BASE_URL}/cursos`)
    const response = await res.json()
    return { props: { cursos: response } }
  } catch (error) {
    console.log(error, 'error');
    return { props: { cursos: [] }}
  }
}
  
export default function Cursos({ cursos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if(cursos) {
    return <h1>No hay cursos</h1>
  }

  return (
    <div>
      <div style={{margin: '100px'}}>
        <ConfigProvider theme={colorTable}>
        <Table 
          dataSource={cursos} 
          columns={cursosTableStructure} 
          onRow={(data, _) => ({
            onClick: (e) => 
            router.push(`/cursos/${data.id}`)
          })}
          rowKey={(record) => record.id}
        />
        </ConfigProvider>
      </div>
    </div>
  )
}